import db from "$/db";
import { countries, visas } from "$/db/schema";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import generateResponse from "../helpers/responseHelper";
import generateError from "../helpers/errorHelper";

const visaRoute = new Hono();

visaRoute.get("/:pcode/:dcode", async (c) => {
    const { pcode, dcode } = c.req.param();

    try {
        if (!pcode) {
            return c.json(generateError("Passport ID is required"));
        }

        if (!dcode) {
            return c.json(generateError("Destination ID is required"));
        }

        let passport = await db.query.countries.findFirst({
            where: eq(countries.code, pcode),
        })

        if (!passport) {
            return c.json(generateError("Passport not found"));
        }

        let destination = await db.query.countries.findFirst({
            where: eq(countries.code, dcode),
        })

        if (!destination) {
            return c.json(generateError("Destination not found"));
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
        c.status(500);
        return c.json(generateError(e));
    }
})

export default visaRoute;