import { Blog, STATUS_BLOG } from '@prisma/client';
import database from '../../../lib/db.server';

const blogAdminService = {
  getAll: async (): Promise<Blog[]> => {
    return await database.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  get: async (id: number): Promise<Blog | null> => {
    return database.blog.findUnique({
      where: {
        id,
      },
    });
  },
  update: async (id: number, status: STATUS_BLOG): Promise<Blog> => {
    return await database.blog.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  },
};

export default blogAdminService;
