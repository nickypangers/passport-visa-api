
import { getTableName, sql, Table } from "drizzle-orm";
import * as seeds from "~/server/database/seeds";
import { tables, useDrizzle } from "../utils/drizzle";

// if (!process.env.DB_SEEDING) {
//     throw new Error("DB_SEEDING must be set");
// }

async function resetTable(table: Table) {
    return useDrizzle().execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`))
}

export default defineTask({
    meta: {
        name: "db:seed",
        description: "Run database seed task",
    },
    async run() {
        for (const table of [
            tables.categories,
            tables.countries,
            tables.visas,
        ]) {
            await resetTable(table);
        }
        await seeds.categories();
        await seeds.countries();
        await seeds.visas();

        return { result: "success" }
    }
})