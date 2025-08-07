import { integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').unique().notNull(),
    providerId: integer('provider').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => [
    unique('unique_user_provider').on(table.email, table.providerId),
]);

export default users;