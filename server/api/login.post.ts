import z from "zod";

const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    if (email === 'admin@admin.com' && password === 'iamtheadmin') {
        await setUserSession(event, {
            user: {
                name: 'John Doe',
            }
        });
        return {}
    }

    throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials',
    });
});