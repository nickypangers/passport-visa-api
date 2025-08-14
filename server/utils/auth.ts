import { and, eq, isNotNull, sql } from "drizzle-orm";
import type { H3Event } from "h3";
import { getHeader } from "h3";
import crypto from "node:crypto";
import { db, tables } from "./drizzle";
import { createAppError } from "../../shared/utils/errors";

export async function isUserTokenValid(event: H3Event, isAddUsage: boolean = false) {
    const authHeader = getHeader(event, "Authorization");
    if (!authHeader) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    console.log("authHeader", authHeader);

    const token = extractToken(authHeader.toString());
    const keyHash = hashToken(token);

    console.log("keyHash", keyHash);

    // First, let's check if the API key exists
    const apiKeyResult = await db.query.apiKeys.findFirst({
        where: and(eq(tables.apiKeys.keyHash, keyHash), isNotNull(tables.apiKeys.userId)),
        columns: {
            id: true,
            userId: true,
            expiresAt: true,
        },
    });

    console.log("apiKeyResult", apiKeyResult);

    if (!apiKeyResult) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    if (apiKeyResult.expiresAt && new Date(apiKeyResult.expiresAt) < new Date()) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const userId = apiKeyResult.userId;
    if (!userId) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    // Now get user and subscription tier info with LEFT JOIN to handle missing subscription tiers
    const [result] = await db
        .select({
            apiKeyId: tables.apiKeys.id,
            userId: tables.apiKeys.userId,
            subscriptionTierId: tables.users.subscriptionTierId,
            monthlyRequestLimit: tables.subscriptionTiers.monthlyRequestLimit,
        })
        .from(tables.apiKeys)
        .innerJoin(tables.users, eq(tables.apiKeys.userId, tables.users.id))
        .leftJoin(
            tables.subscriptionTiers,
            eq(tables.users.subscriptionTierId, tables.subscriptionTiers.id)
        )
        .where(eq(tables.apiKeys.id, apiKeyResult.id))
        .limit(1);

    console.log("result", result);

    if (!result) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    if (isAddUsage) {
        // Use default monthly request limit if no subscription tier is found
        const monthlyRequestLimit = result.monthlyRequestLimit || 100; // Default to 100 requests

        // Atomic daily counter increment (aggregate across endpoints, shard 0)
        const now = new Date();
        const periodDay = now.getFullYear() + "-" +
            String(now.getMonth() + 1).padStart(2, "0") + "-" +
            String(now.getDate()).padStart(2, "0");
        await db.execute(sql`
        INSERT INTO api_usage_counters (user_id, api_key_id, period_day, endpoint, shard, count, api_key_id_bucket, endpoint_bucket)
        VALUES (${userId}, ${result.apiKeyId}, ${periodDay}, '', 0, 1, ${result.apiKeyId || 0}, '')
        ON CONFLICT (user_id, api_key_id_bucket, period_day, endpoint_bucket, shard)
        DO UPDATE SET count = api_usage_counters.count + 1
        WHERE api_usage_counters.count < ${monthlyRequestLimit}
        RETURNING count
    `);
    }

    return { id: result.userId };
}

function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

function extractToken(authorizationHeader: string): string {
    const trimmed = authorizationHeader.trim();
    if (trimmed.toLowerCase().startsWith("bearer ")) {
        return trimmed.slice(7).trim();
    }
    return trimmed;
}