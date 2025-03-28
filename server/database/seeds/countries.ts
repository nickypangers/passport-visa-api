
import countriesData from "./data/countries.json";
import { countries } from "../schema";
import { useDrizzle } from "~/server/utils/drizzle";

export default async function seed() {
    await useDrizzle().insert(countries).values(countriesData);
}