import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const { passport: p, destination: d } = getQuery(event);

    if (!p) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Passport is required.',
        })
    }

    if (!d) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Destination is required.',
        })
    }

    let passport = await useDrizzle().query.countries.findFirst({
        where: eq(tables.countries.code, String(p)),
    })

    if (!passport) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Passport not found.',
        })
    }

    let destination = await useDrizzle().query.countries.findFirst({
        where: eq(tables.countries.code, String(d)),
    })

    if (!destination) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Destination not found.',
        })
    }

    let visa = await useDrizzle().query.visas.findFirst({
        where: and(
            eq(tables.visas.passportId, passport.id),
            eq(tables.visas.destinationId, destination.id),
        ),
        with: {
            passport: true,
            destination: true,
            category: true,
        }
    })

    return {
        id: visa?.id,
        passport: visa?.passport && {
            name: visa.passport.name,
            code: visa.passport.code,
        },
        destination: visa?.destination && {
            name: visa.destination.name,
            code: visa.destination.code,
        },
        dur: visa?.duration,
        category: visa?.category && {
            name: visa.category.name,
            code: visa.category.code,
        }
    }
})