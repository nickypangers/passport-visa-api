import { eq } from "drizzle-orm";
import { createAppError } from "#shared/utils/errors";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    type SessionUser = { id: number; email?: string };
    const sessionUser = session?.user as SessionUser | undefined;
    if (!sessionUser?.id) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const tokens = await db.query.apiKeys.findMany({
        where: eq(tables.apiKeys.userId, sessionUser.id),
        columns: {
            id: true,
            name: true,
            createdAt: true,
            lastSix: true,
            keyHash: false,
            updatedAt: false,
            userId: false,
            description: false,
            expiresAt: false,
            secretEnc: false,
        },
    });

    return tokens;
});

