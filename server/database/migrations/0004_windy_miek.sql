ALTER TABLE "subscription_tiers" RENAME COLUMN "price" TO "monthly_price";--> statement-breakpoint
ALTER TABLE "subscription_tiers" ADD COLUMN "yearly_price" integer NOT NULL;