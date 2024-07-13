import { Blog, STATUS_BLOG } from '@prisma/client';
import database from '../../../lib/db.server';
import { BlogInput } from './blog.model';

const blogHostService = {
  create: async (data: BlogInput): Promise<Blog> => {
    const { accountId, title, content, image, status } = data;
    return await database.blog.create({
      data: {
        accountId,
        title,
        content,
        image,
        status,
      },
    });
  },
  update: async (id: number, data: BlogInput): Promise<Blog> => {
    const { accountId, title, content, image, status } = data;
    return await database.blog.update({
      where: {
        id,
      },
      data: {
        accountId,
        title,
        content,
        image,
        status,
      },
    });
  },
  getAll: async (
    accountId: number,
    status: STATUS_BLOG
  ): Promise<Blog[]> => {
    return await database.blog.findMany({
      where: {
        accountId,
        status,
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
