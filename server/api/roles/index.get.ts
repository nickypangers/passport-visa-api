import { isUserTokenValid } from "../../utils/auth";

export default defineEventHandler(async (event) => {
    await isUserTokenValid(event);
    const roles = await db.query.roles.findMany();

    return roles;
});