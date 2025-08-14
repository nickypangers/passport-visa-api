import { and, eq, gte, lt, sql } from "drizzle-orm";
import crypto from "node:crypto";
import { isUserTokenValid } from "../utils/auth";

export default defineEventHandler(async (event) => {
    await isUserTokenValid(event);

    const { token, from, to } = getQuery(event);

    const toDate = to ? new Date(to.toString()) : new Date();
    const fromDate = from ? new Date(from.toString()) : undefined;

    if (fromDate && isNaN(fromDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid from date" });
    }

    if (isNaN(toDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid to date" });
    }

    if (!token) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const keyHash = hashToken(token.toString());

    const apiKeyResult = await db.query.apiKeys.findFirst({
        where: eq(tables.apiKeys.keyHash, keyHash),
        columns: {
            userId: true,
        },
    });


    if (!apiKeyResult) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const toDay = toDate.toISOString().slice(0, 10);
    const fromDay = fromDate ? fromDate.toISOString().slice(0, 10) : undefined;

    const conditions = [
        eq(tables.apiUsageCounters.userId, apiKeyResult.userId!),
        ...(fromDay ? [gte(tables.apiUsageCounters.periodDay, fromDay)] : []),
        lt(tables.apiUsageCounters.periodDay, toDay),
    ];

    const [{ count }] = await db
        .select({ count: sql<number>`COALESCE(CAST(SUM(count) AS int), 0)` })
        .from(tables.apiUsageCounters)
        .where(and(...conditions));

    return { count };
});

function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
}
