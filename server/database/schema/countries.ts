import { index, pgTable, serial, text } from "drizzle-orm/pg-core";
import visas from "./visas";
import { relations } from "drizzle-orm";

const countries = pgTable(
  "countries",
  {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    code: text("code").unique().notNull(),
  },
  (table) => [index("idx_countries_id").on(table.id)]
);

export const countriesRelations = relations(countries, ({ many }) => ({
  visas: many(visas, { relationName: "visa_passport" }),
}));

export default countries;
