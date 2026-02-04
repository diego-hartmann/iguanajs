import { pinoLogger } from './config/logger';
import { startExpressHttpServer } from './server/server';
import { ENV } from './config/env';
import { assertDatabaseConnection } from './shared/utils/prisma-health';

async function bootstrap() {
  pinoLogger.info('🔥 Igniting application');

  await assertDatabaseConnection();

  const port = Number(ENV.PORT ?? 3000);

  if (!Number.isFinite(port)) {
    throw new Error(`Invalid PORT: ${ENV.PORT}`);
  }

  startExpressHttpServer(port, `💻 Server running - listening on port ${port}`);

  pinoLogger.info('🚀 Application successfully launched 🚀');
}

bootstrap().catch((err) => {
  pinoLogger.fatal(err, '💥 Failed to start application');
  process.exit(1);
});
