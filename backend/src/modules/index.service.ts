import { Pagination } from './index.model';

export function getQueryPagination(pagination: Pagination): {
  skip: number;
  take: number;
} {
  const skip = (pagination.page - 1) * pagination.perPage;
  return {
    skip: skip,
    take: pagination.perPage,
  };
}
