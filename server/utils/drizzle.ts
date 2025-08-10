import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../database/schema";
import postgres from "postgres";

export const tables = schema;

const { db_host: host, db_port: port, db_user: user, db_password: password, db_database: database } = useRuntimeConfig();

const connection = postgres({
  host,
  port: parseInt(port),
  user,
  password,
  database,
  max: process.env.DB_MIGRATING || process.env.DB_SEEDING ? 1 : undefined,
  onnotice: process.env.DB_SEEDING ? () => { } : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: process.env.NODE_ENV === "production" ? false : true,
});

export type Country = typeof schema.countries.$inferSelect;
export type Category = typeof schema.categories.$inferSelect;
export type Visa = typeof schema.visas.$inferSelect;
export type User = typeof schema.users.$inferSelect;
export type SubscriptionTier = typeof schema.subscriptionTiers.$inferSelect;
