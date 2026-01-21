import { pinoLogger } from './config/logger';
import { startExpressHttpServer } from './server/server';
import { ENV } from './config/env';

pinoLogger.info('🔥 Igniting application');

const port = ENV.PORT || 3000;

startExpressHttpServer(port, `💻 Server running - listening on port ${port}`);

pinoLogger.info('🚀 Application successfully launched 🚀');
