import db from "$/db";
import { countries } from "$/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import generateResponse from "../helpers/responseHelper";

const countryRoute = new Hono();

countryRoute.get("/:code", async (c) => {

    const { code } = c.req.param();

    if (!code) {
        return c.json({
            error: "Country code is required",
        });
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

    return c.json(generateResponse(response));
});

export default countryRoute;