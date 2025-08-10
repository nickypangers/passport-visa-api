import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import users from "./users";
import { relations } from "drizzle-orm";

const apiKeys = pgTable("api_keys", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    keyHash: text("key_hash").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
    user: one(users, {
        fields: [apiKeys.userId],
        references: [users.id],
    }),
}));

export default apiKeys;