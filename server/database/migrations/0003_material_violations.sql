ALTER TABLE "api_usage_counters" DROP CONSTRAINT "api_usage_counters_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "api_usage_counters" ADD CONSTRAINT "api_usage_counters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;