export default function schemaTemplate(pascalName: string): string {
  return `import { z } from 'zod';

const EmptyObj = z.object({}).strict();

/**
 * Base schema without id
 * (feature author will extend fields)
 */
export const ${pascalName}SchemaWithoutId = z.object({
  // add fields here
});

/**
 * Resource schema (response / entity)
 */
export const ${pascalName}Schema = z.object({
  id: z.string(),
  ...${pascalName}SchemaWithoutId.shape
});

/**
 * Body schemas
 * (Pattern B: { data: ... })
 */
export const Create${pascalName}BodySchema = z.object({
  data: ${pascalName}SchemaWithoutId
});

export const Update${pascalName}BodySchema = z.object({
  data: ${pascalName}SchemaWithoutId.partial()
});

/**
 * Params / Query schemas
 */
export const ${pascalName}IdParamSchema = z.object({
  id: z.string().min(1)
});

export const ${pascalName}QuerySchema = z.object({
  all: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

/**
 * Request envelopes (match validateZodMiddleware)
 * validateZodMiddleware(schema) parses: { body, query, params }
 */

// LIST
export const List${pascalName}RequestSchema = z.object({
  body: EmptyObj.optional(),
  query: ${pascalName}QuerySchema.default({}),
  params: EmptyObj.default({})
});

// CREATE
export const Create${pascalName}RequestSchema = z.object({
  body: Create${pascalName}BodySchema,
  query: EmptyObj.default({}),
  params: EmptyObj.default({})
});

// GET BY ID
export const Get${pascalName}ByIdRequestSchema = z.object({
  body: EmptyObj.optional(),
  query: EmptyObj.default({}),
  params: ${pascalName}IdParamSchema
});

// UPDATE
export const Update${pascalName}RequestSchema = z.object({
  body: Update${pascalName}BodySchema,
  query: EmptyObj.default({}),
  params: ${pascalName}IdParamSchema
});

// DELETE
export const Delete${pascalName}RequestSchema = z.object({
  body: EmptyObj.optional(),
  query: EmptyObj.default({}),
  params: ${pascalName}IdParamSchema
});
`;
}
