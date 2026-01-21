import { Pagination } from '../../../shared/utils/pagination.util';
import { DataSource } from './data-source';

type PrismaDelegate<T> = {
  count(args?: any): Promise<number>;
  findMany(args?: any): Promise<T[]>;
  findUnique(args: any): Promise<T | null>;
  create(args: any): Promise<T>;
  update(args: any): Promise<T>;
  delete(args: any): Promise<T>;
};

export abstract class PrismaDataSourceCrud<T extends { id: string }> implements DataSource<T> {
  protected constructor(protected readonly delegate: PrismaDelegate<T>) {}

  async count(): Promise<number> {
    return this.delegate.count();
  }

  async findAll(params?: Pagination): Promise<T[]> {
    return this.delegate.findMany({
      skip: params?.offset,
      take: params?.limit
    });
  }

  async findById(id: string): Promise<T | null> {
    return this.delegate.findUnique({ where: { id } });
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    return this.delegate.create({ data });
  }

  async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<T | null> {
    try {
      return await this.delegate.update({
        where: { id },
        data
      });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
