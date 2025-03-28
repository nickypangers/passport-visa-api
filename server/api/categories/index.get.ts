export default defineEventHandler(async (event) => {
    let categories = await useDrizzle().query.categories.findMany();

    return categories;
})