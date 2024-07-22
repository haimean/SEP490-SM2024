import { Blog } from '@prisma/client';
import database from '../../../lib/db.server';
import { BlogInput } from './blog.model';

const blogHostService = {
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
      },
      data: {
        accountId,
        caption,
        image,
      },
    });
  },
  getAll: async (accountId: number): Promise<Blog[]> => {
    return await database.blog.findMany({
      where: {
        accountId,
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
      },
    });
  },
};

export default blogHostService;
