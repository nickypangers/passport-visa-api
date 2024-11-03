import { getTableName, sql, Table } from "drizzle-orm";
import db, { connection } from ".";
import * as schema from "./schema";
import * as seeds from "./seeds";

if (!process.env.DB_SEEDING) {
    throw new Error("DB_SEEDING must be set");
}

async function resetTable(db: db, table: Table) {
    return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

async function main() {
    for (const table of [
        schema.categories,
        schema.countries,
        schema.visas,
    ]) {
        await resetTable(db, table);
    }
    await seeds.categories(db);
    await seeds.countries(db);
    // await seeds.visas(db);

    await connection.end();
}

main()
    .then(() => console.log("Seeded successfully"));