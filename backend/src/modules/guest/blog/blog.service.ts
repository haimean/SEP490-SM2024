import { Blog } from '@prisma/client';
import database from '../../../lib/db.server';

const blogGuestService = {
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
};

export default blogGuestService;
