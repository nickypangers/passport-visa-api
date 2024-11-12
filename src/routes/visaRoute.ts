import db from "$/db";
import { countries, visas } from "$/db/schema";
import { and, eq } from "drizzle-orm";
import generateResponse from "../helpers/responseHelper";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import ErrorSchema from "../schemas/ErrorSchema";

const visaRoute = new OpenAPIHono();

const ParamsSchema = z.object({
    pcode: z.string().openapi({
        param: {
            name: 'pcode',
            in: 'path',
        },
        example: 'US',
    }),
    dcode: z.string().openapi({
        param: {
            name: 'dcode',
            in: 'path',
        },
        example: 'CA',
    }),
})

const VisaSchema = z.object({
    id: z.string().openapi({
        example: "1",
    }),
    passport: z.object({
        name: z.string().openapi({
            example: "United States",
        }),
        code: z.string().openapi({
            example: "US",
        }),
    }).openapi({
        example: {
            name: "United States",
            code: "US",
        }
    }),
    destination: z.object({
        name: z.string().openapi({
            example: "Canada",
        }),
        code: z.string().openapi({
            example: "CA",
        }),
    }).openapi({
        example: {
            name: "Canada",
            code: "CA",
        }
    }),
    dur: z.number().nullable().openapi({
        example: 30,
    }),
    category: z.object({
        name: z.string().openapi({
            example: "Visa Free",
        }),
        code: z.string().openapi({
            example: "VF",
        }),
    }).openapi({
        example: {
            name: "Visa Free",
            code: "VF",
        }
    }),
    'last_updated': z.string().openapi({
        example: "2021-08-01T00:00:00Z",
    }),
}).openapi('Visa')

const getVisaRoute = createRoute({
    method: 'get',
    path: '/{pcode}/{dcode}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: VisaSchema,
                }
            },
            description: 'Return visa information'
        },
        500: {
            content: {
                'application/json': {
                    schema: ErrorSchema,
                },
            },
            description: 'Bad request'
        }
    }
})

visaRoute.openapi(getVisaRoute, async (c) => {
    const { pcode, dcode } = c.req.param();

    try {
        if (!pcode) {

            throw new Error("Passport ID is required");
        }

        if (!dcode) {
            throw new Error("Destination ID is required");
        }

        let passport = await db.query.countries.findFirst({
            where: eq(countries.code, pcode),
        })

        if (!passport) {
            throw new Error("Passport not found");
        }

        let destination = await db.query.countries.findFirst({
            where: eq(countries.code, dcode),
        })

        if (!destination) {
            throw new Error("Destination not found");
        }

        let visa = await db.query.visas.findFirst({
            where: and(
                eq(visas.passportId, passport.id),
                eq(visas.destinationId, destination.id),
            ),
            with: {
                passport: true,
                destination: true,
                category: true,
            }
        })

        return c.json(generateResponse({
            id: visa?.id,
            passport: visa?.passport && {
                name: visa?.passport?.name,
                code: visa?.passport?.code,
            },
            destination: visa?.destination && {
                name: visa?.destination?.name,
                code: visa?.destination?.code,
            },
            dur: visa?.duration,
            category: visa?.category && {
                name: visa?.category?.name,
                code: visa?.category?.code,
            },
        }));
    } catch (e) {
        throw e;
    }
})

export default visaRoute;