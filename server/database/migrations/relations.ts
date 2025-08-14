import { relations } from "drizzle-orm/relations";
import { countries, visas, categories, roles, users, subscriptionTiers, apiKeys, apiUsageCounters } from "./schema";

export const visasRelations = relations(visas, ({one}) => ({
	country_passportId: one(countries, {
		fields: [visas.passportId],
		references: [countries.id],
		relationName: "visas_passportId_countries_id"
	}),
	country_destinationId: one(countries, {
		fields: [visas.destinationId],
		references: [countries.id],
		relationName: "visas_destinationId_countries_id"
	}),
	category: one(categories, {
		fields: [visas.categoryId],
		references: [categories.id]
	}),
}));

export const countriesRelations = relations(countries, ({many}) => ({
	visas_passportId: many(visas, {
		relationName: "visas_passportId_countries_id"
	}),
	visas_destinationId: many(visas, {
		relationName: "visas_destinationId_countries_id"
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	visas: many(visas),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id]
	}),
	subscriptionTier: one(subscriptionTiers, {
		fields: [users.subscriptionTierId],
		references: [subscriptionTiers.id]
	}),
	apiKeys: many(apiKeys),
	apiUsageCounters: many(apiUsageCounters),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(users),
}));

export const subscriptionTiersRelations = relations(subscriptionTiers, ({many}) => ({
	users: many(users),
}));

export const apiKeysRelations = relations(apiKeys, ({one, many}) => ({
	user: one(users, {
		fields: [apiKeys.userId],
		references: [users.id]
	}),
	apiUsageCounters: many(apiUsageCounters),
}));

export const apiUsageCountersRelations = relations(apiUsageCounters, ({one}) => ({
	user: one(users, {
		fields: [apiUsageCounters.userId],
		references: [users.id]
	}),
	apiKey: one(apiKeys, {
		fields: [apiUsageCounters.apiKeyId],
		references: [apiKeys.id]
	}),
}));