import stripe from "stripe"
import z from "zod"

const bodySchema = z.object({
    stripePriceId: z.string().min(1),
})

export default defineEventHandler(async (event) => {

    const { stripePriceId } = await readValidatedBody(event, bodySchema.parse)

    const stripeInstance = new stripe(useRuntimeConfig().stripe_secret_key)
    const session = await stripeInstance.checkout.sessions.create({
        success_url: "http://localhost:3000/order/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/order/error?session_id={CHECKOUT_SESSION_ID}",
        mode: "subscription",
        line_items: [
            {
                price: stripePriceId,
                quantity: 1,
            }
        ]
    })

    return { sessionUrl: session.url }
})