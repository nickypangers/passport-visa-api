import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import users from "./users";
import { relations } from "drizzle-orm";

const subscriptionTiers = pgTable('subscription_tiers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const subscriptionTiersRelations = relations(subscriptionTiers, ({ many }) => ({
    users: many(users, { relationName: 'users' }),
}));

export default subscriptionTiers;