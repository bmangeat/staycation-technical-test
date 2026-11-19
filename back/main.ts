import { createApp } from "@/app";
import { loadEnv } from "@/config/env";
import { pino } from 'pino';
import pool from "@/db";

function main(): void {
    const logger = pino();
    const app = createApp(logger);
    const env = loadEnv()
    app.listen(env.port, env.host, () => {
        logger.info({ host: env.host, port: env.port }, 'Server listening');
    });
    const shutdown = async () => {
        await pool.end();
        process.exit(0);
    };

    process.on('SIGTERM', () => {
        shutdown().catch((error: unknown) => {
            logger.error(error);
            process.exit(1);
        });
    });
}

try {
    main();
} catch (error) {
    console.error(error instanceof Error ? (error.stack ?? error.message) : error);
    process.exit(1);
}