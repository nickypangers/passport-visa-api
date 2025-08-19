import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const session = await getUserSession(event);
    const sessionUser = session?.user as SessionUser | undefined;
    if (!sessionUser?.id) {
        throw createAppError({ statusCode: 401, message: "Unauthorized" });
    }

    const idParam = getRouterParam(event, "id");
    const id = Number(idParam);
    if (!Number.isFinite(id)) {
        throw createAppError({ statusCode: 400, message: "Invalid token id" });
    }

    console.log("Deleting token", id);

    await db.delete(tables.apiKeys).where(eq(tables.apiKeys.id, id));

    return { success: true };
});