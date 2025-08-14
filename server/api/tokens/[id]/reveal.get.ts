import { and, eq } from "drizzle-orm";
import { createAppError } from "#shared/utils/errors";
import { decryptSecret } from "../../../utils/crypto";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    type SessionUser = { id: number };
    const sessionUser = session?.user as SessionUser | undefined;
    if (!sessionUser?.id) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const idParam = getRouterParam(event, "id");
    const id = Number(idParam);
    if (!Number.isFinite(id)) {
        throw createAppError({ statusCode: 400, message: "Invalid token id" });
    }

    const rows = await db
        .select({ id: tables.apiKeys.id, userId: tables.apiKeys.userId, secretEnc: tables.apiKeys.secretEnc })
        .from(tables.apiKeys)
        .where(and(eq(tables.apiKeys.id, id), eq(tables.apiKeys.userId, sessionUser.id)))
        .limit(1);

    const found = rows[0];
    if (!found) {
        throw createAppError({ statusCode: 404, message: "Token not found" });
    }
    if (!found.secretEnc) {
        throw createAppError({ statusCode: 404, message: "Token secret not available" });
    }

    const secret = process.env.NUXT_SESSION_PASSWORD ?? process.env.SESSION_PASSWORD ?? "dev-secret";
    const token = decryptSecret(found.secretEnc, secret);
    return { token };
});

