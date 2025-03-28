import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const { code } = getQuery(event);

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code is required.',
        });
    }

    console.log(code);

    let country = await useDrizzle().query.countries.findFirst({
        where: eq(tables.countries.code, String(code)),
        with: {
            visas: {
                with: {
                    category: true,
                    destination: true,
                }
            }
        }
    })

    let response = {
        name: country?.name,
        code: country?.code,
    } as any;

    let categories = await useDrizzle().select({ code: tables.categories.code }).from(tables.categories);

    categories.map(({ code }) => code).forEach((code) => {
        let result = country?.visas?.filter((v) => v.category.code === code).map((v) => ({ name: v.destination.name, code: v.destination.code, duration: v.duration }));
        response[code] = result;
    })

    return response;
})