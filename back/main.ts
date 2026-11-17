import { createApp } from "./app";
import { loadEnv } from "./config/env";
import { pino, type Logger, type LoggerOptions } from 'pino';

function main(): void {
    const logger = pino();
    const app = createApp(logger);
    const env = loadEnv()
    app.listen(env.port, env.host, () => {
        logger.info({ host: env.host, port: env.port }, 'Server listening');
    });
}

try {
    main();
} catch (error) {
    // The logger may not exist yet (invalid env), so fall back to stderr.
    console.error(error instanceof Error ? (error.stack ?? error.message) : error);
    process.exit(1);
}