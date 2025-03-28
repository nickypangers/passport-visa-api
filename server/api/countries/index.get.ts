export default defineEventHandler(async (event) => {
    let countries = await useDrizzle().query.countries.findMany();

    return countries;
})