import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import users from "./users";
import { relations, sql } from "drizzle-orm";

// const subscriptionTiers = pgTable("subscription_tiers", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     sku: text("sku").notNull().unique(),
//     description: text("description").notNull(),
//     features: text("features").array().default(sql`'{}'::text[]`),
//     price: integer("price"),
//     stripePriceId: text("stripe_price_id"),
//     createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
// });

const subscriptionTiers = pgTable("subscription_tiers", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    monthlySku: text("monthly_sku").unique(),
    yearlySku: text("yearly_sku").unique(),
    features: text("features").array().default(sql`'{}'::text[]`),
    monthlyPrice: integer("monthly_price"),
    yearlyPrice: integer("yearly_price"),
    monthlyStripePriceId: text("monthly_stripe_price_id"),
    yearlyStripePriceId: text("yearly_stripe_price_id"),
    monthlyRequestLimit: integer("monthly_request_limit").default(100),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscriptionTiersRelations = relations(subscriptionTiers, ({ many }) => ({
    users: many(users, { relationName: "users" }),
}));

export default subscriptionTiers;