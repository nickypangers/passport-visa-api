import { boolean, integer, pgTable, serial, text, timestamp, unique, index } from "drizzle-orm/pg-core";
import roles from "./roles";
import subscription_tiers from "./subscription_tiers";
import { relations } from "drizzle-orm";

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").unique().notNull(),
    name: text("name").notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    providerId: integer("provider_id").notNull(),
    roleId: integer("role_id").references(() => roles.id),
    subscriptionTierId: integer("subscription_tier_id").references(() => subscription_tiers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    unique("uniq_email").on(table.email),
    index("idx_users_subscription_tier_id").on(table.subscriptionTierId),
]);

export const usersRelations = relations(users, ({ one }) => ({
    subscriptionTier: one(subscription_tiers, {
        fields: [users.subscriptionTierId],
        references: [subscription_tiers.id],
    }),
}));

export default users;