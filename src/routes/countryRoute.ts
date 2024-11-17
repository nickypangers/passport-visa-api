import db from "$/db";
import { countries } from "$/db/schema";
import { eq } from "drizzle-orm";
import generateResponse from "../helpers/responseHelper";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import ErrorSchema from "../schemas/ErrorSchema";
import {cors} from 'hono/cors';

const countryRoute = new OpenAPIHono();

const SingleCountrySchema = z.object({
    name: z.string().openapi({
        example: "Canada",
    }),
    code: z.string().openapi({
        example: "CA",
    }),
    duration: z.number().nullable().openapi({
        example: 30,
    }),
});

const ParamsSchema = z.object({
    code: z.string().openapi({
        param: {
            name: 'code',
            in: 'path',
        },
        example: 'US',
    })
})

const CountrySchema = z.object({
    name: z.string().openapi({
        example: "United States",
    }),
    code: z.string().openapi({
        example: "US",
    }),
    VR: z.array(SingleCountrySchema).openapi({
        example: [
            { name: "Canada", code: "CA", duration: 30 }
        ]
    }),
    VOA: z.array(SingleCountrySchema).openapi({
        example: [
            { name: "India", code: "IN", duration: 30 }
        ]
    }),
    VF: z.array(SingleCountrySchema).openapi({
        example: [
            { name: "Australia", code: "AU", duration: 30 }
        ]
    }),
    EV: z.array(SingleCountrySchema).openapi({
        example: [
            { name: "China", code: "CN", duration: 30 }
        ]
    }),
    NA: z.array(SingleCountrySchema).openapi({
        example: [
            { name: "Brazil", code: "BR", duration: 30 }
        ]
    }),
    'last_updated': z.string().openapi({
        example: "2021-09-01T00:00:00.000Z",
    })
}).openapi('Country')

const getCountryRoute = createRoute({
    method: 'get',
    path: '/{code}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: CountrySchema,
                }
            },
            description: 'Return country visa information'
        },
        500: {
            content: {
                'application/json': {
                    schema: ErrorSchema,
                }
            },
            description: 'Internal server error'
        }
    }
})

countryRoute.openapi(getCountryRoute, async (c) => {
    const { code } = c.req.param();

    if (!code) {
        throw new Error("Country code is required");
    }

    let country = await db.query.countries.findFirst({
        where: eq(countries.code, code),
        with: {
            visas: {
                with: {
                    category: true,
                    destination: true,
                }
            },
        }
    })

    let response = {
        name: country?.name,
        code: country?.code,
        "VR": country?.visas?.filter((v) => v.category.code === "VR").map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration })),
        "VOA": country?.visas?.filter((v) => v.category.code === "VOA").map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration })),
        "VF": country?.visas?.filter((v) => v.category.code === "VF").map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration })),
        "EV": country?.visas?.filter((v) => v.category.code === "EV").map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration })),
        "NA": country?.visas?.filter((v) => v.category.code === "NA").map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration })),
    }

    return c.json(generateResponse(response), 200);

})

export default countryRoute;