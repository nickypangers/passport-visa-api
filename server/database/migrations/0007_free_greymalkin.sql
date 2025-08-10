ALTER TABLE "subscription_tiers" ADD COLUMN "price" integer;--> statement-breakpoint
ALTER TABLE "subscription_tiers" DROP COLUMN "monthly_price";--> statement-breakpoint
ALTER TABLE "subscription_tiers" DROP COLUMN "yearly_price";