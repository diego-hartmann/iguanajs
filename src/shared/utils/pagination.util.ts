import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export type Pagination = {
  page: number;
  limit: number;
  offset: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function parsePagination(query: unknown): Pagination {
  const parsed = PaginationQuerySchema.safeParse(query);

  let page = DEFAULT_PAGE;
  let limit = DEFAULT_LIMIT;

  if (parsed.success) {
    const p = parsed.data.page;
    const l = parsed.data.limit;

    if (typeof p === 'number' && Number.isFinite(p) && p > 0) {
      page = Math.floor(p);
    }

    if (typeof l === 'number' && Number.isFinite(l) && l > 0) {
      limit = Math.min(Math.floor(l), MAX_LIMIT);
    }
  }

  const offset = (page - 1) * limit;

  return { page, limit, offset };
}


export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export function toPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: Pagination
): PaginatedResponse<T> {
  const totalPages = Math.max(Math.ceil(total / pagination.limit), 1);

  return {
    data,
    meta: {
      total,
      page: pagination.page,
      limit: pagination.limit,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1
    }
  };
}
