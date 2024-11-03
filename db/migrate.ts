import { migrate } from "drizzle-orm/postgres-js/migrator";
import db, { connection } from ".";
import config from "../drizzle.config"

if (!process.env.DB_MIGRATING) {
    throw new Error("DB_MIGRATING must be set");
}

migrate(db, { migrationsFolder: config.out! })
    .then(() => connection.end())
    .then(() => console.log("Migrated successfully"))