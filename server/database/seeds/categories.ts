import categoriesData from "./data/categories.json";
import { tables, useDrizzle } from "~/server/utils/drizzle";

export default async function seed() {
    await useDrizzle().insert(tables.categories).values(categoriesData);
}