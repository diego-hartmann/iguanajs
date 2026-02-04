import type { ZodTypeAny } from 'zod';
import { createMiddleware, Middleware } from '../../shared/utils/create-middleware';

export const validateZodMiddleware = (schema: ZodTypeAny): Middleware =>
  createMiddleware((req) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (!result.success) {
      throw result.error;
    }

    const parsed = result.data as {
      body?: unknown;
      query?: unknown;
      params?: unknown;
    };

    req.body = parsed.body ?? req.body;
    req.query = parsed.query ?? req.query;
    req.params = parsed.params ?? req.params;
  });
