import db from "..";
import { visas } from "../schema";

import countriesJson from "./data/countries.json";
import visasData from "./data/visas.json";


export default async function seed(db: db) {

    const data = await Promise.all(visasData.map(async (v: any) => {
        if (v.Passport === v.Destination) {
            return null;
        }

        let did = countriesJson.findIndex((c) => c.code === v.Destination) + 1;
        let cid = countriesJson.findIndex((c) => c.code === v.Passport) + 1;
        var category_id = 1;
        var duration: number | null = null;
        if (typeof v.Requirement == 'number') {
            duration = v.Requirement;
        } else {
            switch (v.Requirement) {
                case 'visa on arrival':
                    category_id = 2;
                    break;
                case 'e-visa':
                    category_id = 3;
                    break;
                case 'covid ban':
                    category_id = 5;
                    break;
                case 'no admission':
                    category_id = 5;
                    break;
                default:
                    category_id = 4;
                    break;
            }
        }

        console.log(`Seeding visa for ${v.Passport} to ${v.Destination} with duration ${duration} and category ${category_id}`);

        return {
            passportId: cid,
            destinationId: did,
            duration: duration,
            categoryId: category_id,
        }
    }));

    console.log("Seeding visas length: ", data.length);

    const filteredData = data.filter((v) => v !== null);

    for (let i = 0; i < filteredData.length; i += 1000) {
        await db.insert(visas).values(filteredData.slice(i, i + 1000))
            .then(() => console.log(`Visas seeded successfully ${i} to ${i + 1000}`))
    }

    // await db.insert(visas).values(data)
    //     .then(() => console.log("Visas seeded successfully"))

}