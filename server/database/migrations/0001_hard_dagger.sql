CREATE INDEX "idx_api_keys_key_hash_user_id" ON "api_keys" USING btree ("key_hash","user_id");--> statement-breakpoint
CREATE INDEX "idx_api_keys_user_id" ON "api_keys" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_users_subscription_tier_id" ON "users" USING btree ("subscription_tier_id");