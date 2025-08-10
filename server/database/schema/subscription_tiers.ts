import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import users from "./users";
import { relations, sql } from "drizzle-orm";

const subscriptionTiers = pgTable("subscription_tiers", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    sku: text("sku").notNull().unique(),
    description: text("description").notNull(),
    features: text("features").array().default(sql`'{}'::text[]`),
    price: integer("price"),
    stripePriceId: text("stripe_price_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscriptionTiersRelations = relations(subscriptionTiers, ({ many }) => ({
    users: many(users, { relationName: "users" }),
}));

export default subscriptionTiers;