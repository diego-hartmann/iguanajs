import express from 'express';
import { securityMiddleware } from './middlewares/security.middleware';
import { requestLoggerMiddleware } from './middlewares/request-logger.middleware';
import routes from './routes';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { HTTP_ERROR } from '../shared/errors/http-error.util';
import { disconnectPrisma, getPrisma } from '../../store/prisma-client';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(securityMiddleware);
app.use(requestLoggerMiddleware);

app.get('/health', async (_req, res, next) => {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return res.status(200).json({ data: { status: 'ok' } });
  } catch {
    return next(HTTP_ERROR.serviceUnavailable('Database connection failed'));
  }
});

app.use(routes);

app.use((_req, _res, next) =>
  next(HTTP_ERROR.notFound('Route not found'))
);

app.use(errorHandlerMiddleware);

async function shutdown() {
  await disconnectPrisma();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
