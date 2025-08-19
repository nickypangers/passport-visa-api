import { date, index, integer, pgTable, primaryKey, smallint, text } from "drizzle-orm/pg-core";
import users from "./users";
import apiKeys from "./api_keys";
import { sql } from "drizzle-orm";

const apiUsageCounters = pgTable("api_usage_counters", {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "set null" }),
    apiKeyId: integer("api_key_id").references(() => apiKeys.id, { onDelete: "set null" }),
    periodDay: date("period_day").notNull().default(sql`date_trunc('day', now())`),
    endpoint: text("endpoint"),
    count: integer("count").notNull().default(0),
    shard: smallint("shard").notNull().default(0),

    apiKeyIdBucket: integer("api_key_id_bucket").notNull().default(0),
    endpointBucket: text("endpoint_bucket").notNull().default(""),
}, (table) => [
    primaryKey({ columns: [table.userId, table.apiKeyIdBucket, table.periodDay, table.endpointBucket, table.shard] }),
    sql`CONSTRAINT api_usage_ck_endpoint_bucket CHECK (${table.endpointBucket} = COALESCE(${table.endpoint}, ''))`,
    sql`CONSTRAINT api_usage_ck_api_key_bucket CHECK (${table.apiKeyIdBucket} = COALESCE(${table.apiKeyId}, 0))`,
    index("idx_api_usage_counters_user_day").on(table.userId, table.periodDay),
]);

export default apiUsageCounters;