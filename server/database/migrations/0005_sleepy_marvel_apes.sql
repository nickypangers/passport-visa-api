ALTER TABLE "subscription_tiers" ALTER COLUMN "monthly_price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription_tiers" ALTER COLUMN "yearly_price" DROP NOT NULL;