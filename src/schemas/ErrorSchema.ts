import { z } from "@hono/zod-openapi";


const ErrorSchema = z.object({
    message: z.string().openapi({
        example: "Passport not found",
    }),
})

export default ErrorSchema;