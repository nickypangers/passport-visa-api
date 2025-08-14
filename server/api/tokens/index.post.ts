import { ApiKeyBodySchema } from "#shared/utils/validator";
import { createAppError } from "#shared/utils/errors";
import crypto from "node:crypto";
import { encryptSecret } from "../../utils/crypto";

export default defineEventHandler(async (event) => {
    try {
        const session = await getUserSession(event);

        if (!session?.user?.id) {
            throw createAppError({ statusCode: 401, message: "Unauthorized" });
        }

        const body = await readValidatedBody(event, ApiKeyBodySchema.parse);

        const rawToken = crypto.randomBytes(32).toString("hex");
        const keyHash = crypto.createHash("sha256").update(rawToken).digest("hex");

        const [created] = await db
            .insert(tables.apiKeys)
            .values({
                userId: session.user.id,
                keyHash,
                name: body.name,
                description: null,
                expiresAt: null,
                secretEnc: encryptSecret(
                    rawToken,
                    process.env.NUXT_SESSION_PASSWORD ?? process.env.SESSION_PASSWORD ?? "dev-secret"
                ),
                lastSix: rawToken.slice(-6),
            })
            .returning();

        return {
            id: created.id,
            name: created.name,
            token: rawToken,
            createdAt: created.createdAt,
            lastSix: created.lastSix,
        };
    } catch (err: unknown) {
        if (err && typeof err === "object" && "statusCode" in err) {
            throw err;
        }
        throw createAppError({ statusCode: 500, message: "Failed to create token" });
    }
});

