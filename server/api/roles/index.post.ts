import roles from "~~/server/database/schema/roles";
import { RoleBodySchema } from "#shared/utils/validator";
import { isUserTokenValid } from "../../utils/auth";

export default defineEventHandler(async (event) => {
    await isUserTokenValid(event);
    const { name } = await readValidatedBody(event, RoleBodySchema.parse);

    const role = await db.insert(roles).values({ name }).returning();

    return role;
});