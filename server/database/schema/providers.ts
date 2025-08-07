import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const providers = pgTable('providers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    displayName: text('display_name').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export default providers;