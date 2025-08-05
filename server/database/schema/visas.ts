import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, unique, index } from 'drizzle-orm/pg-core';
import categories from './categories';
import countries from './countries';

const visas = pgTable(
  'visas',
  {
    id: serial('id').primaryKey(),
    passportId: integer('passport_id')
      .notNull()
      .references(() => countries.id),
    destinationId: integer('destination_id')
      .notNull()
      .references(() => countries.id),
    duration: integer('duration'),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
  },
  (table) => [
    unique().on(table.passportId, table.destinationId),
    index('idx_visas_passport_id').on(table.passportId),
    index('idx_visas_destination_id').on(table.destinationId),
    index('idx_visas_category_id').on(table.categoryId),
    index('idx_visas_passport_category').on(table.passportId, table.categoryId),
  ]
);

export const visasRelations = relations(visas, ({ one }) => ({
  category: one(categories, {
    fields: [visas.categoryId],
    references: [categories.id],
    relationName: 'visa_category',
  }),
  passport: one(countries, {
    fields: [visas.passportId],
    references: [countries.id],
    relationName: 'visa_passport',
  }),
  destination: one(countries, {
    fields: [visas.destinationId],
    references: [countries.id],
    relationName: 'visa_destination',
  }),
}));

export default visas;
