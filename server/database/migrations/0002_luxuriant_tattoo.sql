CREATE INDEX "idx_visas_passport_id" ON "visas" USING btree ("passport_id");--> statement-breakpoint
CREATE INDEX "idx_visas_destination_id" ON "visas" USING btree ("destination_id");--> statement-breakpoint
CREATE INDEX "idx_visas_category_id" ON "visas" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_visas_passport_category" ON "visas" USING btree ("passport_id","category_id");