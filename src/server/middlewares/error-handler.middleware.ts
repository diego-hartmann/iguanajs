import type express from 'express';
import { type ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { HTTP_ERROR, HttpErrorHandler } from '../../shared/errors/http-error.util';
import { logger } from '../../config/logger';

type ErrorEnvelope = {
  error: {
    message: string;
    code: string;
    issues?: unknown;
  };
};

const createErrorInstance = (err: unknown): HttpErrorHandler => {
  if (err instanceof HttpErrorHandler) return err;

  if (err instanceof ZodError) {
    return HTTP_ERROR.badRequest('Validation error');
  }

  if (err instanceof Error) {
    return HTTP_ERROR.internalError(err.message);
  }

  return HTTP_ERROR.internalError('Unexpected error');
};

const mapErrorCode = (status: number, err: unknown): string => {
  if (err instanceof ZodError) return 'VALIDATION_ERROR';
  if (status === 404) return 'NOT_FOUND';
  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  if (status === 429) return 'RATE_LIMITED';
  if (status >= 500) return 'INTERNAL_ERROR';
  return 'BAD_REQUEST';
};

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
): void => {
  const httpError = createErrorInstance(err);

  const payload: ErrorEnvelope = {
    error: {
      message: httpError.message,
      code: mapErrorCode(httpError.status, err)
    }
  };

  // include Zod issues only for validation errors
  if (err instanceof ZodError) {
    payload.error.issues = err.errors;
  }

  // log with correct level (based on final status)
  logger(req.method, req.originalUrl, httpError.status);

  res.status(httpError.status).json(payload);
};
