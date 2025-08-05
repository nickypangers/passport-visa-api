export default defineEventHandler(async (_) => {
  const countries = await db.select().from(tables.countries);
  return countries;
});
