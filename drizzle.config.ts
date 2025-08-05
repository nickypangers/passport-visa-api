import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  out: './server/database/migrations',
  schema: './server/database/schema',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT!),
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    ssl: false,
  },
  verbose: true,
} satisfies Config;
