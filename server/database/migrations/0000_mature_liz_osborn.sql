CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"key_hash" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
CREATE TABLE "subscription_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"sku" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_tiers_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"provider_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "unique_user_provider" UNIQUE("email","provider_id")
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
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "providers_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_passport_id_countries_id_fk" FOREIGN KEY ("passport_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_destination_id_countries_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visas" ADD CONSTRAINT "visas_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_categories_id" ON "categories" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_countries_id" ON "countries" USING btree ("id");--> statement-breakpoint
CREATE INDEX "idx_visas_passport_id" ON "visas" USING btree ("passport_id");--> statement-breakpoint
CREATE INDEX "idx_visas_destination_id" ON "visas" USING btree ("destination_id");--> statement-breakpoint
CREATE INDEX "idx_visas_category_id" ON "visas" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_visas_passport_category" ON "visas" USING btree ("passport_id","category_id");