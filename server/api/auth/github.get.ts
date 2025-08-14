import { eq } from "drizzle-orm";
import { roles, users } from "~~/server/database/schema";
import { createAppError } from "#shared/utils/errors";

export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event, { user }) {

        if (!user.email) {
            throw createAppError({
                statusCode: 400,
                message: "Email is required",
            });
        }

        const dbUser = await db.query.users.findFirst({
            where: eq(users.email, user.email),
        });

        if (dbUser) {
            await setUserSession(event, { user: dbUser });
            return sendRedirect(event, "/profile");
        }

        const userRole = await db.query.roles.findFirst({
            where: eq(roles.name, "User"),
        });

        if (!userRole) {
            throw createAppError({
                statusCode: 500,
                message: "User role not found",
            });
        }

        const newUser = await db.insert(users).values({
            email: user.email,
            providerId: user.id,
            roleId: userRole?.id,
            emailVerified: user?.email_verified,
            name: user?.name,
        }).returning();

        await setUserSession(event, { user: newUser[0] });
        return sendRedirect(event, "/profile");
    },
    onError(event, error) {
        console.error("GitHub OAuth error:", error);
        return sendRedirect(event, "/");
    }
});