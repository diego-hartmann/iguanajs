export default function controllerTemplate(
  pascalName: string,
  kebabName: string,
  isDatabaseEntity: boolean
): string {
  if (!isDatabaseEntity) {
    return `import { ${pascalName}Service } from '../services/${kebabName}.service';

export class ${pascalName}Controller {
  constructor(private readonly service = new ${pascalName}Service()) {}
}
`;
  }

  return `import type { Request, Response } from 'express';
import type { z } from 'zod';

import { ${pascalName}Service } from '../services/${kebabName}.service';
import { asyncHandler } from '../../shared/utils/async-handler';
import { HTTP_ERROR } from '../../shared/errors/http-error.util';
import { parsePagination, toPaginatedResponse } from '../../shared/utils/pagination.util';

import {
  List${pascalName}RequestSchema,
  Create${pascalName}RequestSchema,
  Get${pascalName}ByIdRequestSchema,
  Update${pascalName}RequestSchema,
  Delete${pascalName}RequestSchema
} from '../validations/${kebabName}.schema';

type Req<TSchema extends z.ZodTypeAny> = Request<
  z.infer<TSchema>['params'],
  any,
  z.infer<TSchema>['body'],
  z.infer<TSchema>['query']
>;

export class ${pascalName}Controller {
  constructor(private readonly service = new ${pascalName}Service()) {}

  list = asyncHandler(async (req: Req<typeof List${pascalName}RequestSchema>, res: Response) => {
    const all = req.query.all === 'true';

    if (all) {
      const data = await this.service.listAll();

      // keep same response shape: { data, meta }
      const pagination = parsePagination(req.query);
      const total = data.length;

      return res.status(200).json(toPaginatedResponse(data, total, pagination));
    }

    const pagination = parsePagination(req.query);
    const { data, total } = await this.service.listPage(pagination);

    return res.status(200).json(toPaginatedResponse(data, total, pagination));
  });

  getById = asyncHandler(async (req: Req<typeof Get${pascalName}ByIdRequestSchema>, res: Response) => {
    const entity = await this.service.getById(req.params.id);
    if (!entity) throw HTTP_ERROR.notFound('${pascalName} not found');
    return res.status(200).json({ data: entity });
  });

  create = asyncHandler(async (req: Req<typeof Create${pascalName}RequestSchema>, res: Response) => {
    const created = await this.service.create(req.body.data);
    return res.status(201).json({ data: created });
  });

  update = asyncHandler(async (req: Req<typeof Update${pascalName}RequestSchema>, res: Response) => {
    const updated = await this.service.update(req.params.id, req.body.data);
    if (!updated) throw HTTP_ERROR.notFound('${pascalName} not found');
    return res.status(200).json({ data: updated });
  });

  remove = asyncHandler(async (req: Req<typeof Delete${pascalName}RequestSchema>, res: Response) => {
    await this.service.remove(req.params.id);
    return res.status(204).send();
  });
}
`;
}
