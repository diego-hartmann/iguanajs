import { Pagination } from '../../../shared/utils/pagination.util';

type PrismaDelegate<TEntity, TCreate, TUpdate> = {
  count(args?: any): Promise<number>;
  findMany(args?: any): Promise<TEntity[]>;
  findUnique(args: any): Promise<TEntity | null>;
  create(args: { data: TCreate }): Promise<TEntity>;
  update(args: { where: { id: string }; data: TUpdate }): Promise<TEntity>;
  delete(args: { where: { id: string } }): Promise<TEntity>;
};

export abstract class PrismaCrudRepository<TEntity extends { id: string }, TCreate, TUpdate> {
  protected constructor(protected readonly delegate: PrismaDelegate<TEntity, TCreate, TUpdate>) {}

  async count(): Promise<number> {
    return this.delegate.count();
  }

  async findAll(params?: Pagination): Promise<TEntity[]> {
    const args: any = {};

    if (params?.offset !== undefined) args.skip = params.offset;
    if (params?.limit !== undefined) args.take = params.limit;

    return this.delegate.findMany(args);
  }

  async findById(id: string): Promise<TEntity | null> {
    return this.delegate.findUnique({ where: { id } });
  }

  async create(data: TCreate): Promise<TEntity> {
    return this.delegate.create({ data });
  }

  async update(id: string, data: TUpdate): Promise<TEntity | null> {
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
