import { SubscriptionTierBodySchema } from "#shared/utils/validator";
import { createAppError } from "#shared/utils/errors";
import { isUserTokenValid } from "../../utils/auth";

export default defineEventHandler(async (event) => {
    await isUserTokenValid(event);
    try {
        const body = await readValidatedBody(event, SubscriptionTierBodySchema.parse);

        const subscriptionTier = await db
            .insert(tables.subscriptionTiers)
            .values(body)
            .returning();

        return subscriptionTier;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err && typeof err === "object" && "statusCode" in err) {
            throw err;
        }
        throw createAppError({
            statusCode: 500,
            message: "Failed to create subscription tier",
        });
    }
});