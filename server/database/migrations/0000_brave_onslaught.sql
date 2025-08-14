CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"key_hash" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"expires_at" timestamp with time zone,
	"secret_enc" text,
	"last_six" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_usage_counters" (
	"user_id" integer NOT NULL,
	"api_key_id" integer,
	"period_day" date DEFAULT date_trunc('day', now()) NOT NULL,
	"endpoint" text,
	"count" integer DEFAULT 0 NOT NULL,
	"shard" smallint DEFAULT 0 NOT NULL,
	"api_key_id_bucket" integer DEFAULT 0 NOT NULL,
	"endpoint_bucket" text DEFAULT '' NOT NULL,
	CONSTRAINT "api_usage_counters_user_id_api_key_id_period_day_endpoint_shard_pk" PRIMARY KEY("user_id","api_key_id","period_day","endpoint","shard")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "subscription_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"monthly_sku" text,
	"yearly_sku" text,
	"features" text[] DEFAULT '{}'::text[],
	"monthly_price" integer,
	"yearly_price" integer,
	"monthly_stripe_price_id" text,
	"yearly_stripe_price_id" text,
	"monthly_request_limit" integer DEFAULT 100,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_tiers_monthly_sku_unique" UNIQUE("monthly_sku"),
	CONSTRAINT "subscription_tiers_yearly_sku_unique" UNIQUE("yearly_sku")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"provider_id" integer NOT NULL,
	"role_id" integer,
	"subscription_tier_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "uniq_email" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "visas" (
	"id" serial PRIMARY KEY NOT NULL,
	"passport_id" integer NOT NULL,
	"destination_id" integer NOT NULL,
	"duration" integer,
	"category_id" integer NOT NULL,
	CONSTRAINT "visas_passport_id_destination_id_unique" UNIQUE("passport_id","destination_id")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "providers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage_counters" ADD CONSTRAINT "api_usage_counters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage_counters" ADD CONSTRAINT "api_usage_counters_api_key_id_api_keys_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_subscription_tier_id_subscription_tiers_id_fk" FOREIGN KEY ("subscription_tier_id") REFERENCES "public"."subscription_tiers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_passport_id_countries_id_fk" FOREIGN KEY ("passport_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_destination_id_countries_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_api_usage_counters_user_day" ON "api_usage_counters" USING btree ("user_id","period_day");--> statement-breakpoint
CREATE INDEX "idx_categories_id" ON "categories" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_countries_id" ON "countries" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_visas_passport_id" ON "visas" USING btree ("passport_id");--> statement-breakpoint
CREATE INDEX "idx_visas_destination_id" ON "visas" USING btree ("destination_id");--> statement-breakpoint
CREATE INDEX "idx_visas_category_id" ON "visas" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_visas_passport_category" ON "visas" USING btree ("passport_id","category_id");