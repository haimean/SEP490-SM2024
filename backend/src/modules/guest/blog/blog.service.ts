import { Blog } from '@prisma/client';
import database from '../../../lib/db.server';

const blogGuestService = {
  getAll: async (): Promise<Blog[]> => {
    return await database.blog.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
  get: async (id: number): Promise<Blog | null> => {
    return database.blog.findUnique({
      where: {
        id,
        status: 'PUBLISHED',
      },
      include: {
        comment: {
          include: {
            parentComment: true,
          },
        },
      },
    });
  },
};

export default blogGuestService;
