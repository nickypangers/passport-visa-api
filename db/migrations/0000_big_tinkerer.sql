CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visas" (
	"id" serial PRIMARY KEY NOT NULL,
	"passport_id" integer NOT NULL,
	"destination_id" integer NOT NULL,
	"duration" integer,
	"category_id" integer NOT NULL,
	CONSTRAINT "visas_passport_id_destination_id_unique" UNIQUE("passport_id","destination_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visas" ADD CONSTRAINT "visas_passport_id_countries_id_fk" FOREIGN KEY ("passport_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visas" ADD CONSTRAINT "visas_destination_id_countries_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visas" ADD CONSTRAINT "visas_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
