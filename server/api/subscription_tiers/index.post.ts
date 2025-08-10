import { SubscriptionTierBodySchema } from "~~/shared/utils/validator";

export default defineEventHandler(async (event) => {
    try {
        const body = await readValidatedBody(event, SubscriptionTierBodySchema.parse);

        const subscriptionTier = await db
            .insert(tables.subscriptionTiers)
            .values(body)
            .returning();

        return subscriptionTier;
    } catch (err: any) {
        if (err && typeof err === "object" && "statusCode" in err) {
            throw err;
        }
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to create subscription tier",
        });
    }
});