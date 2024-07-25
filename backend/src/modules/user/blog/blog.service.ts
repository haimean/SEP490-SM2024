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
  delete: async (id: number): Promise<Blog> => {
    await database.comment.deleteMany({
      where: {
        blogId: id,
      },
    });
    await database.reportBlog.deleteMany({
      where: {
        blogId: id,
      },
    });
    return await database.blog.delete({
      where: {
        id,
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
  getAll: async (
    pagination: Pagination
  ): Promise<{ total: number; blogs: Blog[] }> => {
    const blogs = await database.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
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
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  getComment: async (id: number): Promise<any> => {
    return database.comment.findMany({
      where: {
        blogId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  getCommentNew: async (id: number): Promise<any> => {
    return database.comment.findMany({
      where: {
        blogId: id,
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      ...getQueryPagination({ page: 1, perPage: 3 }),
    });
  },
};

export default blogUserService;
