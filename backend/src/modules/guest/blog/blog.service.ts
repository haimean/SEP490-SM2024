import { Blog } from '@prisma/client';

import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const blogGuestService = {
  getAll: async (
    pagination: Pagination
  ): Promise<{ total: number; blogs: Blog[] }> => {
    const blogs = await database.blog.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        account: true,
      },
      ...getQueryPagination(pagination),
    });
    const total = await database.blog.findMany();
    return { total: total.length, blogs };
  },
  get: async (id: number): Promise<Blog | null> => {
    return database.blog.findUnique({
      where: {
        id,
      },
    });
  },
};

export default blogGuestService;
