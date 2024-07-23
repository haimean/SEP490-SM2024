import { Blog } from '@prisma/client';
import database from '../../../lib/db.server';
import { BlogInput } from './blog.model';
import { getQueryPagination } from '../../index.service';
import { Pagination } from '../../index.model';

const blogUserService = {
  create: async (data: BlogInput): Promise<Blog> => {
    const { accountId, image, caption } = data;
    return await database.blog.create({
      data: {
        accountId,
        caption,
        image,
      },
    });
  },
  update: async (id: number, data: BlogInput): Promise<Blog> => {
    const { accountId, image, caption } = data;
    return await database.blog.update({
      where: {
        id,
        accountId,
      },
      data: {
        caption,
        image,
      },
    });
  },
  getAll: async (pagination: Pagination): Promise<Blog[]> => {
    return await database.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      ...getQueryPagination(pagination),
    });
  },
  get: async (id: number): Promise<Blog | null> => {
    return database.blog.findUnique({
      where: {
        id,
      },
      include: {
        account: true,
      },
    });
  },
};

export default blogUserService;
