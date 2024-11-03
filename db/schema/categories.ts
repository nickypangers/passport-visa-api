import { pgTable, serial, text } from "drizzle-orm/pg-core";

const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    code: text("code").unique().notNull(),
})

export default categories;