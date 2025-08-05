import { index, pgTable, serial, text } from 'drizzle-orm/pg-core';

const categories = pgTable(
  'categories',
  {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    code: text('code').unique().notNull(),
  },
  (table) => [index('idx_categories_id').on(table.id)]
);

export default categories;
