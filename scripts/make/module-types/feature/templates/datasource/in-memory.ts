export default function inMemoryDatasourceTemplate(pascalName: string, kebabName: string): string {
  return `import { randomUUID } from 'crypto';
import type { Pagination } from '../../shared/utils/pagination';
import type { ${pascalName} } from '../models/${kebabName}.models';
import type { ${pascalName}DataSource } from './${kebabName}.datasource';

export class ${pascalName}InMemoryDataSource implements ${pascalName}DataSource {
  private store = new Map<string, ${pascalName}>();

  async count(): Promise<number> {
    return this.store.size;
  }

  async findAll(params?: Pagination): Promise<${pascalName}[]> {
    const values = Array.from(this.store.values());

    if (!params?.limit && !params?.offset) return values;

    const offset = params.offset ?? 0;
    const limit = params.limit ?? values.length;

    return values.slice(offset, offset + limit);
  }

  async findById(id: string): Promise<${pascalName} | null> {
    return this.store.get(id) ?? null;
  }

  async create(data: Omit<${pascalName}, 'id'>): Promise<${pascalName}> {
    const entity: ${pascalName} = { id: randomUUID(), ...data } as ${pascalName};
    this.store.set(entity.id, entity);
    return entity;
  }

  async update(
    id: string,
    data: Partial<Omit<${pascalName}, 'id'>>
  ): Promise<${pascalName} | null> {
    const existing = this.store.get(id);
    if (!existing) return null;

    const updated: ${pascalName} = { ...existing, ...data };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
`;
}
