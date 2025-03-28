import { migrate } from "drizzle-orm/postgres-js/migrator"
import config from "~/drizzle.config"

export default defineTask({
    meta: {
        name: 'db:migrate',
        description: "Run database migrate task",
    },
    async run() {
        return migrate(useDrizzle(), { migrationsFolder: config.out! })
            .then(() => ({ result: "success" }))
    }
})