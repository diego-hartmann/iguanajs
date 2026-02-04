import { z, type ZodTypeAny } from 'zod';
import type { Request, RequestHandler } from 'express';

export type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

type InferEnvelope<TSchema extends ZodTypeAny> = z.infer<TSchema>;

type TypedRequest<TSchema extends ZodTypeAny> = Request<
  InferEnvelope<TSchema>['params'],
  any,
  InferEnvelope<TSchema>['body'],
  InferEnvelope<TSchema>['query']
>;

type ApiRoute<TSchema extends ZodTypeAny> = {
  method: HttpMethod;
  path: string;
  requestSchema: TSchema;

  handler: RequestHandler;
  middlewares?: RequestHandler[];

  responses: Record<number, { description: string; schema?: ZodTypeAny }>;
};

export type ApiContract<TSchema extends ZodTypeAny> = {
  basePath: string;
  tag: string;
  routes: ApiRoute<TSchema>[];
};
