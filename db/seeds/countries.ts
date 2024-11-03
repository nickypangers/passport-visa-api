import db from "..";
import countriesData from "./data/countries.json";
import { countries } from "../schema";

export default async function seed(db: db) {
    await db.insert(countries).values(countriesData);
}