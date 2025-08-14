import { createAppError } from "#shared/utils/errors";

export default defineEventHandler(async (_) => {
    const isH3Error = (e: unknown): e is { statusCode: number } =>
        typeof e === "object" && e !== null && "statusCode" in e;
    try {
        const subscriptionTiers = await db.query.subscriptionTiers.findMany();
        return subscriptionTiers;
    } catch (err: unknown) {
        if (isH3Error(err)) {
            throw err;
        }
        throw createAppError({
            statusCode: 500,
            message: "Failed to fetch subscription tiers",
        });
    }
});