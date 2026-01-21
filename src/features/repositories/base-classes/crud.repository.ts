import { DataSource } from '../../data-sources/base-classes/data-source';
import { Pagination } from '../../../shared/utils/pagination.util';

export class CrudRepository<T extends { id: string }> {
  constructor(protected readonly datasource: DataSource<T>) {}

  count(): Promise<number> {
    return this.datasource.count();
  }

  findAll(params?: Pagination): Promise<T[]> {
    return this.datasource.findAll(params);
  }

  findById(id: string): Promise<T | null> {
    return this.datasource.findById(id);
  }

  create(data: Omit<T, 'id'>): Promise<T> {
    return this.datasource.create(data);
  }

  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null> {
    return this.datasource.update(id, data);
  }

  delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }
}
