import { pgTable, index, unique, serial, text, foreignKey, integer, boolean, timestamp, primaryKey, date, smallint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const countries = pgTable("countries", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	code: text().notNull(),
}, (table) => [
	index("idx_countries_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	unique("countries_name_unique").on(table.name),
	unique("countries_code_unique").on(table.code),
]);

export const categories = pgTable("categories", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	code: text().notNull(),
}, (table) => [
	index("idx_categories_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	unique("categories_name_unique").on(table.name),
	unique("categories_code_unique").on(table.code),
]);

export const visas = pgTable("visas", {
	id: serial().primaryKey().notNull(),
	passportId: integer("passport_id").notNull(),
	destinationId: integer("destination_id").notNull(),
	duration: integer(),
	categoryId: integer("category_id").notNull(),
}, (table) => [
	index("idx_visas_category_id").using("btree", table.categoryId.asc().nullsLast().op("int4_ops")),
	index("idx_visas_destination_id").using("btree", table.destinationId.asc().nullsLast().op("int4_ops")),
	index("idx_visas_passport_category").using("btree", table.passportId.asc().nullsLast().op("int4_ops"), table.categoryId.asc().nullsLast().op("int4_ops")),
	index("idx_visas_passport_id").using("btree", table.passportId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.passportId],
			foreignColumns: [countries.id],
			name: "visas_passport_id_countries_id_fk"
		}),
	foreignKey({
			columns: [table.destinationId],
			foreignColumns: [countries.id],
			name: "visas_destination_id_countries_id_fk"
		}),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "visas_category_id_categories_id_fk"
		}),
	unique("visas_passport_id_destination_id_unique").on(table.passportId, table.destinationId),
]);

export const providers = pgTable("providers", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	displayName: text("display_name").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("providers_name_unique").on(table.name),
]);

export const subscriptionTiers = pgTable("subscription_tiers", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	features: text().array().default([""]),
	monthlySku: text("monthly_sku"),
	yearlySku: text("yearly_sku"),
	monthlyPrice: integer("monthly_price"),
	yearlyPrice: integer("yearly_price"),
	monthlyStripePriceId: text("monthly_stripe_price_id"),
	yearlyStripePriceId: text("yearly_stripe_price_id"),
	monthlyRequestLimit: integer("monthly_request_limit").default(100),
}, (table) => [
	unique("subscription_tiers_monthly_sku_unique").on(table.monthlySku),
	unique("subscription_tiers_yearly_sku_unique").on(table.yearlySku),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	providerId: integer("provider_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	roleId: integer("role_id"),
	name: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	subscriptionTierId: integer("subscription_tier_id"),
}, (table) => [
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "users_role_id_roles_id_fk"
		}),
	foreignKey({
			columns: [table.subscriptionTierId],
			foreignColumns: [subscriptionTiers.id],
			name: "users_subscription_tier_id_subscription_tiers_id_fk"
		}),
	unique("users_email_unique").on(table.email),
	unique("uniq_email").on(table.email),
]);

export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("roles_name_unique").on(table.name),
]);

export const apiKeys = pgTable("api_keys", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	keyHash: text("key_hash").notNull(),
	name: text().notNull(),
	description: text(),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	secretEnc: text("secret_enc"),
	lastSix: text("last_six"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "api_keys_user_id_users_id_fk"
		}),
]);

export const apiUsageCounters = pgTable("api_usage_counters", {
	userId: integer("user_id").notNull(),
	apiKeyId: integer("api_key_id").notNull(),
	periodDay: date("period_day").default(sql`date_trunc('day'::text, now())`).notNull(),
	endpoint: text().notNull(),
	count: integer().default(0).notNull(),
	shard: smallint().default(0).notNull(),
	apiKeyIdBucket: integer("api_key_id_bucket").default(0).notNull(),
	endpointBucket: text("endpoint_bucket").default(').notNull(),
}, (table) => [
	index("idx_api_usage_counters_user_day").using("btree", table.userId.asc().nullsLast().op("date_ops"), table.periodDay.asc().nullsLast().op("date_ops")),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "api_usage_counters_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.apiKeyId],
			foreignColumns: [apiKeys.id],
			name: "api_usage_counters_api_key_id_api_keys_id_fk"
		}).onDelete("set null"),
	primaryKey({ columns: [table.userId, table.apiKeyId, table.periodDay, table.endpoint, table.shard], name: "api_usage_counters_user_id_api_key_id_period_day_endpoint_shard"}),
]);
