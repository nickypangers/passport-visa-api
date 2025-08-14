import { integer, pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";
import users from "./users";
import { relations } from "drizzle-orm";

const apiKeys = pgTable("api_keys", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    keyHash: text("key_hash").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    // encrypted token value; null for legacy rows
    secretEnc: text("secret_enc"),
    // convenience preview such as last 6 chars to help users identify
    lastSix: text("last_six"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
    index("idx_api_keys_key_hash_user_id").on(table.keyHash, table.userId),
    index("idx_api_keys_user_id").on(table.userId),
]);

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
    user: one(users, {
        fields: [apiKeys.userId],
        references: [users.id],
    }),
}));

export default apiKeys;