import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import visas from "./visas";

const countries = pgTable("countries", {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    code: text("code").unique().notNull(),
})

export const countriesRelations = relations(countries, ({ many }) => ({
    visas: many(visas, { relationName: 'visa_passport' }),
}))

export default countries;