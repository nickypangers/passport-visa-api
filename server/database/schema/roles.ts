import { pgTable, serial, text } from "drizzle-orm/pg-core";

const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});

export default roles;