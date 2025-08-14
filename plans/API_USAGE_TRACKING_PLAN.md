## API Usage Tracking Plan (PostgreSQL-first, Redis optional)

### Goals

- Efficiently track per-user and per-API key usage with minimal DB load.
- Enforce tier limits/rate limits safely under concurrency (no double-counting).
- Keep implementation aligned with Nuxt/Nitro + Drizzle + PostgreSQL.
- Provide a clear upgrade path to Redis for higher throughput without changing the public API.

### Key Recommendations (TL;DR)

- Prefer counters over per-request logs. Use date-bucketed counters in PostgreSQL.
- Use a single atomic UPSERT to increment and enforce limits, avoiding a separate read.
- If QPS grows and a single row becomes a hotspot, shard counters per user/day (e.g., 8 shards) and sum.
- Optionally add Redis for hot-path rate limiting and batching to PostgreSQL (recommended beyond a few thousand RPS).

---

## Option A — PostgreSQL-only (simple, strong consistency)

### Schema

- New table `api_usage_counters` for date-bucketed counters. Primary key groups by period (daily), user, optional key, optional endpoint.

```sql
CREATE TABLE IF NOT EXISTS api_usage_counters (
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  api_key_id    INTEGER REFERENCES api_keys(id) ON DELETE SET NULL,
  period_day    DATE NOT NULL, -- date_trunc('day', now())::date
  endpoint      TEXT,          -- optional, null aggregates all endpoints
  count         INTEGER NOT NULL DEFAULT 0,
  -- optional sharding to reduce hot row contention under high QPS
  shard         SMALLINT NOT NULL DEFAULT 0,

  PRIMARY KEY (user_id, COALESCE(api_key_id, 0), period_day, COALESCE(endpoint, ''), shard)
);

CREATE INDEX IF NOT EXISTS idx_api_usage_counters_user_day
  ON api_usage_counters (user_id, period_day);
```

Notes:

- Keep `endpoint` null to aggregate globally; store endpoint only if you need per-endpoint analytics.
- Start with `shard = 0`. If contention appears, write across N shards and sum.

### Atomic increment with limit enforcement

Use a single statement to both increment and enforce a daily limit. This avoids a separate read and is safe under concurrency.

```sql
-- :user_id, :api_key_id, :period_day, :limit, :endpoint, :shard
INSERT INTO api_usage_counters (user_id, api_key_id, period_day, endpoint, shard, count)
VALUES (:user_id, :api_key_id, :period_day, :endpoint, :shard, 1)
ON CONFLICT (user_id, COALESCE(api_key_id, 0), period_day, COALESCE(endpoint, ''), shard)
DO UPDATE SET count = api_usage_counters.count + 1
WHERE api_usage_counters.count < :limit
RETURNING count;
```

Behavior:

- If the row doesn’t exist, it inserts with `count = 1` and returns 1.
- If it exists and `count < :limit`, it atomically increments and returns the new count.
- If `count >= :limit`, the UPDATE’s WHERE fails and the statement returns 0 rows. Treat that as 429 (limit exceeded).

Drizzle example (Nitro server code):

```ts
import { sql } from 'drizzle-orm';

export async function incrementDailyUsage({
  userId,
  apiKeyId, // number | null
  endpoint, // string | null
  dailyLimit,
  shard = 0,
}: {
  userId: number;
  apiKeyId: number | null;
  endpoint?: string | null;
  dailyLimit: number; // derive from subscription tier
  shard?: number;
}) {
  const periodDay = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [{ count } = {} as any] = await db.execute(sql`
    INSERT INTO api_usage_counters (user_id, api_key_id, period_day, endpoint, shard, count)
    VALUES (${userId}, ${apiKeyId}, ${periodDay}, ${endpoint ?? null}, ${shard}, 1)
    ON CONFLICT (user_id, COALESCE(api_key_id, 0), period_day, COALESCE(endpoint, ''), shard)
    DO UPDATE SET count = api_usage_counters.count + 1
    WHERE api_usage_counters.count < ${dailyLimit}
    RETURNING count
  `);

  if (!count) {
    // limit exceeded
    throw createAppError({ statusCode: 429, message: 'API daily limit exceeded' });
  }

  return count as number;
}
```

To read the day’s usage quickly:

```sql
SELECT COALESCE(SUM(count), 0) AS used
FROM api_usage_counters
WHERE user_id = $1 AND period_day = $2;
```

### Handling high throughput (hot row contention)

- If a single row per user/day is contended, use `shard` in [0..N-1]. Randomly choose a shard for each increment and sum shards for reads. Start with N=8.
- Alternative: Store per-minute counters (more rows, less contention), then aggregate for reporting.

### Pros/Cons

- Pros: No new infra, fully consistent, simple to reason about, one statement per request.
- Cons: At very high QPS, a single counter row per user/day can become a hotspot without sharding.

---

## Option B — Redis + PostgreSQL (recommended for higher QPS and rate limiting)

### Flow

- Hot path per request:
  - Redis `INCRBY` on `usage:{userId}:{yyyy-mm-dd}` (and/or per-key, per-endpoint).
  - Redis-based rate limiting via token bucket/Lua script to atomically check and increment within the limit.
- Background flush:
  - Every 5–15s, a worker reads deltas from Redis and UPSERTs into PostgreSQL counters in batches.
  - On process shutdown/startup, best-effort flush to avoid losing buffered increments.

### Pros/Cons

- Pros: Very low latency, easy rate limiting, minimal Postgres write load, smoother scaling.
- Cons: Extra infra (Redis), eventual consistency between Redis and Postgres (acceptable for analytics and daily usage), more moving parts.

### Minimal integration

- Use a namespaced key pattern and TTL = remaining seconds in day for daily keys.
- Single Lua script for “check+increment+return remaining” to avoid race conditions:

```lua
-- KEYS[1] = counter key, ARGV[1] = limit, ARGV[2] = increment
local current = redis.call('GET', KEYS[1])
if not current then current = 0 else current = tonumber(current) end
if current + tonumber(ARGV[2]) > tonumber(ARGV[1]) then
  return {-1, current} -- limit exceeded
end
local newv = redis.call('INCRBY', KEYS[1], ARGV[2])
return {newv, current}
```

Background job (Nitro cron or external worker) periodically reads keys and applies batched UPSERTs to `api_usage_counters`.

---

## Integration Points (this repo)

1. Middleware at API boundary

- Where you authenticate API keys/users, call `incrementDailyUsage(...)` before executing the handler. If it throws 429, return immediately.

2. Subscription tier lookup

- Store tier daily limits in `subscription_tiers` (already present). Determine `dailyLimit` per user/key on each request or cache in-memory for 60s.

3. Schema file

- Add `server/database/schema/api_usage_counters.ts` with the table definition above, plus exports in `server/database/schema/index.ts`.

4. Utilities

- Add `server/utils/usage.ts` with the Postgres-only function. If adding Redis later, keep the function signature stable and swap internals.

5. Analytics (optional)

- If you need per-request logs, write to an UNLOGGED table or a queue for async processing. Avoid logging every request synchronously.

---

## Operational Guidance

- Monitoring: Watch `pg_stat_statements` and lock wait times for `api_usage_counters`. If contention rises, enable sharding.
- Cleanup: Retain counters for your billing window (e.g., 90 days). Use a simple DELETE by `period_day < now() - interval '90 days'` or partition by month.
- Backfill: If moving to counters from logs, run `INSERT ... SELECT ... GROUP BY` to initialize historical counts.

---

## Why a read-before-write is unnecessary

- The UPSERT-with-WHERE pattern does both the increment and the limit check in a single statement. Under concurrency, one request succeeds and others fail gracefully once the threshold is reached. This removes the extra read and prevents race conditions.

---

## Decision Matrix

- Low to moderate traffic: PostgreSQL-only with atomic UPSERT. Simple and robust.
- Moderate to high traffic or bursty workloads: Add Redis for rate limiting and batching; PostgreSQL remains the source of truth for billing/reporting.
