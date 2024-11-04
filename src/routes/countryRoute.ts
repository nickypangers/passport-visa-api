import db from "$/db";
import { countries } from "$/db/schema";
import { eq } from "drizzle-orm";
import generateResponse from "../helpers/responseHelper";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

const countryRoute = new OpenAPIHono();

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
    VR: z.array(z.object({
        name: z.string().openapi({
            example: "Canada",
        }),
        code: z.string().openapi({
            example: "CA",
        }),
    })).openapi({
        example: [
            { name: "Canada", code: "CA" }
        ]
    }),
    VOA: z.array(z.object({
        name: z.string().openapi({
            example: "India",
        }),
        code: z.string().openapi({
            example: "IN",
        }),
    })).openapi({
        example: [
            { name: "India", code: "IN" }
        ]
    }),
    VF: z.array(z.object({
        name: z.string().openapi({
            example: "Australia",
        }),
        code: z.string().openapi({
            example: "AU",
        }),
    })).openapi({
        example: [
            { name: "Australia", code: "AU" }
        ]
    }),
    EV: z.array(z.object({
        name: z.string().openapi({
            example: "China",
        }),
        code: z.string().openapi({
            example: "CN",
        }),
    })).openapi({
        example: [
            { name: "China", code: "CN" }
        ]
    }),
    NA: z.array(z.object({
        name: z.string().openapi({
            example: "Brazil",
        }),
        code: z.string().openapi({
            example: "BR",
        }),
    })).openapi({
        example: [
            { name: "Brazil", code: "BR" }
        ]
    }),
    'last_updated': z.string().openapi({
        example: "2021-09-01T00:00:00.000Z",
    })
}).openapi('Country')

const getCountryRoute = createRoute({
    method: 'get',
    path: '/:code',
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
        "VR": country?.visas?.filter((v) => v.category.code === "VR").map((v) => ({ name: v.destination.name, code: v.destination.code })),
        "VOA": country?.visas?.filter((v) => v.category.code === "VOA").map((v) => ({ name: v.destination.name, code: v.destination.code })),
        "VF": country?.visas?.filter((v) => v.category.code === "VF").map((v) => ({ name: v.destination.name, code: v.destination.code })),
        "EV": country?.visas?.filter((v) => v.category.code === "EV").map((v) => ({ name: v.destination.name, code: v.destination.code })),
        "NA": country?.visas?.filter((v) => v.category.code === "NA").map((v) => ({ name: v.destination.name, code: v.destination.code })),
    }

    return c.json(generateResponse(response), 200);

})

export default countryRoute;