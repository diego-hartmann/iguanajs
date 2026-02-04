export default function serviceTemplate(
  pascalName: string,
  kebabName: string,
  isDatabaseEntity: boolean = true
): string {
  if (!isDatabaseEntity) {
    return `export class ${pascalName}Service {
  // TODO add logic here
}
`;
  }

  return `import { ${pascalName}Repository } from '../repositories/${kebabName}.repository';
import type { ${pascalName}, ${pascalName}Create, ${pascalName}Update } from '../models/${kebabName}.models';
import { ${pascalName}Mapper } from '../mappers/${kebabName}.mapper';
import type { Pagination } from '../../shared/utils/pagination.util';

export class ${pascalName}Service {
  constructor(
    private readonly repo = new ${pascalName}Repository(),
    private readonly mapper = new ${pascalName}Mapper()
  ) {}

  async listAll(): Promise<${pascalName}[]> {
    const rows = await this.repo.findAll();
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async listPage(pagination: Pagination): Promise<{ data: ${pascalName}[]; total: number }> {
    const [rows, total] = await Promise.all([
      this.repo.findAll(pagination),
      this.repo.count()
    ]);

    return {
      data: rows.map((r) => this.mapper.toDomain(r)),
      total
    };
  }

  async getById(id: string): Promise<${pascalName} | null> {
    const row = await this.repo.findById(id);
    return row ? this.mapper.toDomain(row) : null;
  }

  async create(data: ${pascalName}Create): Promise<${pascalName}> {
    const created = await this.repo.create(this.mapper.toCreateInput(data));
    return this.mapper.toDomain(created);
  }

  async update(id: string, data: ${pascalName}Update): Promise<${pascalName} | null> {
    const updated = await this.repo.update(id, this.mapper.toUpdateInput(data));
    return updated ? this.mapper.toDomain(updated) : null;
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
`;
}
