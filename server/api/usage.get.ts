import { and, eq, gte, lt, sql } from "drizzle-orm";
import crypto from "node:crypto";
// import { isUserTokenValid } from "../utils/auth";

export default defineEventHandler(async (event) => {
    const user = await isUserTokenValid(event);

    const { token, from, to } = getQuery(event);

    const toDate = to ? new Date(to.toString()) : new Date();
    const fromDate = from ? new Date(from.toString()) : undefined;

    if (fromDate && isNaN(fromDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid from date" });
    }

    if (isNaN(toDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid to date" });
    }

    // Convert to YYYY-MM-DD format for PostgreSQL DATE type
    // Use local date to avoid timezone issues
    const toDay = toDate.getFullYear() + "-" +
        String(toDate.getMonth() + 1).padStart(2, "0") + "-" +
        String(toDate.getDate()).padStart(2, "0");
    const fromDay = fromDate ?
        fromDate.getFullYear() + "-" +
        String(fromDate.getMonth() + 1).padStart(2, "0") + "-" +
        String(fromDate.getDate()).padStart(2, "0") : undefined;

    let userId: number;

    // If token is provided, validate it and get the associated user
    if (token) {
        const keyHash = hashToken(token.toString());

        const apiKeyResult = await db.query.apiKeys.findFirst({
            where: eq(tables.apiKeys.keyHash, keyHash),
            columns: {
                userId: true,
            },
        });

        if (!apiKeyResult) {
            throw createAppError({ statusCode: 401, message: "Invalid token" });
        }

        if (!apiKeyResult.userId) {
            throw createAppError({ statusCode: 401, message: "Invalid token" });
        }

        userId = apiKeyResult.userId!;
    } else {
        userId = user.id!;
    }

    const conditions = [
        eq(tables.apiUsageCounters.userId, userId),
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
