import { Pagination } from '../../../shared/utils/pagination.util';

export interface DataSource<T extends { id: string }> {
  count(): Promise<number>;
  findAll(params?: Pagination): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null>;
  delete(id: string): Promise<void>;
}
