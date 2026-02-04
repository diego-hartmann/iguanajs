export default function routesTemplate(
  pascalName: string,
  kebabName: string,
  camelName: string,
  pluralKebab: string
): string {
  return `import { Router } from 'express';
import { z } from 'zod';
import { ${pascalName}Controller } from '../controllers/${kebabName}.controller';

import { validateZodMiddleware } from '../../server/middlewares/validate-zod.middleware';

import {
  ${pascalName}Schema,
  List${pascalName}RequestSchema,
  Create${pascalName}RequestSchema,
  Get${pascalName}ByIdRequestSchema,
  Update${pascalName}RequestSchema,
  Delete${pascalName}RequestSchema
} from '../validations/${kebabName}.schema';

import { ApiContract } from '../../shared/types/routes.types';

type ${pascalName}RequestSchemas =
  | typeof List${pascalName}RequestSchema
  | typeof Create${pascalName}RequestSchema
  | typeof Get${pascalName}ByIdRequestSchema
  | typeof Update${pascalName}RequestSchema
  | typeof Delete${pascalName}RequestSchema;

const controller = new ${pascalName}Controller();

const ${pascalName}ResponseSchema = z.object({
  data: ${pascalName}Schema
});

const ${pascalName}ListResponseSchema = z.object({
  data: z.array(${pascalName}Schema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  })
});

export const ${camelName}Contract: ApiContract<${pascalName}RequestSchemas> = {
  basePath: '/${pluralKebab}',
  tag: '${pascalName}',
  routes: [
    {
      method: 'get',
      path: '/',
      handler: controller.list,
      requestSchema: List${pascalName}RequestSchema,
      responses: {
        200: { description: 'OK', schema: ${pascalName}ListResponseSchema }
      }
    },
    {
      method: 'post',
      path: '/',
      handler: controller.create,
      requestSchema: Create${pascalName}RequestSchema,
      responses: {
        201: { description: 'Created', schema: ${pascalName}ResponseSchema }
      }
    },
    {
      method: 'get',
      path: '/:id',
      handler: controller.getById,
      requestSchema: Get${pascalName}ByIdRequestSchema,
      responses: {
        200: { description: 'OK', schema: ${pascalName}ResponseSchema },
        404: { description: 'Not found' }
      }
    },
    {
      method: 'patch',
      path: '/:id',
      handler: controller.update,
      requestSchema: Update${pascalName}RequestSchema,
      responses: {
        200: { description: 'OK', schema: ${pascalName}ResponseSchema },
        404: { description: 'Not found' }
      }
    },
    {
      method: 'delete',
      path: '/:id',
      handler: controller.remove,
      requestSchema: Delete${pascalName}RequestSchema,
      responses: {
        204: { description: 'No Content' },
        404: { description: 'Not found' }
      }
    }
  ]
};

export const ${camelName}Routes = Router();

${camelName}Contract.routes.forEach((r) => {
  ${camelName}Routes[r.method](
    r.path,
    ...(r.middlewares ?? []),
    validateZodMiddleware(r.requestSchema as any),
    r.handler
  );
});
`;
}
