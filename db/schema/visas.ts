import { integer, pgTable, serial, text, unique } from "drizzle-orm/pg-core";
import countries from "./countries";
import { relations } from "drizzle-orm";
import categories from "./categories";

const visas = pgTable("visas", {
    id: serial("id").primaryKey(),
    passportId: integer("passport_id").notNull().references(() => countries.id),
    destinationId: integer("destination_id").notNull().references(() => countries.id),
    duration: integer("duration"),
    categoryId: integer("category_id").notNull().references(() => categories.id),
}, (table) => ({
    passportDestinationIdx: unique().on(table.passportId, table.destinationId),
}))

export const visasRelations = relations(visas, ({ one }) => ({
    category: one(categories, {
        fields: [visas.categoryId],
        references: [categories.id],
        relationName: "visa_category",
    }),
    passport: one(countries, {
        fields: [visas.passportId],
        references: [countries.id],
        relationName: "visa_passport",
    }),
    destination: one(countries, {
        fields: [visas.destinationId],
        references: [countries.id],
        relationName: "visa_destination",
    }),
}))

export default visas;