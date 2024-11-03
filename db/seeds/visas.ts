import db from "..";
import visasData from "./data/visas.json";
import { visas } from "../schema";

export default async function seed(db: db) {
    await db.insert(visas).values(visasData);
}