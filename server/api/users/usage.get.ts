import { eq, and, gte, lt } from "drizzle-orm";
import { createAppError } from "#shared/utils/errors";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);

    if (!session?.user?.id) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const userId = session.user.id;
    const { from, to } = getQuery(event);

    // Default to current month if no dates provided
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const toDate = to ? new Date(to.toString()) : nextMonthStart;
    const fromDate = from ? new Date(from.toString()) : currentMonthStart;

    if (fromDate && isNaN(fromDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid from date" });
    }

    if (isNaN(toDate.getTime())) {
        throw createAppError({ statusCode: 400, message: "Invalid to date" });
    }

    // Convert to YYYY-MM-DD format for PostgreSQL DATE type
    const toDay = toDate.getFullYear() + "-" +
        String(toDate.getMonth() + 1).padStart(2, "0") + "-" +
        String(toDate.getDate()).padStart(2, "0");
    const fromDay = fromDate.getFullYear() + "-" +
        String(fromDate.getMonth() + 1).padStart(2, "0") + "-" +
        String(fromDate.getDate()).padStart(2, "0");

    const conditions = [
        eq(tables.apiUsageCounters.userId, userId),
        gte(tables.apiUsageCounters.periodDay, fromDay),
        lt(tables.apiUsageCounters.periodDay, toDay),
    ];

    const usageData = await db
        .select({
            periodDay: tables.apiUsageCounters.periodDay,
            endpoint: tables.apiUsageCounters.endpoint,
            count: tables.apiUsageCounters.count,
        })
        .from(tables.apiUsageCounters)
        .where(and(...conditions))
        .orderBy(tables.apiUsageCounters.periodDay);

    return {
        userId,
        usage: usageData,
        period: {
            from: fromDay,
            to: toDay,
        },
        currentMonth: !from && !to // Indicates if this is the default current month query
    };
});