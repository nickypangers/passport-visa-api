import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema"
import postgres from "postgres";

export const tables = schema;

const connection = postgres(process.env.DATABASE_URL!, {
    max: (process.env.DB_MIGRATING || process.env.DB_SEEDING) ? 1 : undefined,
    onnotice: process.env.DB_SEEDING ? () => { } : undefined,
});

export function useDrizzle() {
    return drizzle(connection, { schema, logger: process.env.NODE_ENV === "production" ? false : true })
}

export type Country = typeof schema.countries.$inferSelect;
export type Category = typeof schema.categories.$inferSelect;
export type Visa = typeof schema.visas.$inferSelect;