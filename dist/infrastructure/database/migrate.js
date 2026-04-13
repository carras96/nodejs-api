import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../../config/env.js';
import { logger } from '../../core/logger.js';
const runMigrations = async () => {
    const sql = postgres(env.DATABASE_URL, { max: 1 });
    const db = drizzle(sql);
    logger.info('⏳ Running migrations...');
    try {
        await migrate(db, { migrationsFolder: 'drizzle' });
        logger.info('✅ Migrations completed successfully!');
    }
    catch (error) {
        logger.error('❌ Migration failed:', error);
        process.exit(1);
    }
    finally {
        await sql.end();
    }
};
runMigrations();
//# sourceMappingURL=migrate.js.map