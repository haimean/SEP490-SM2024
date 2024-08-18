import { Blog } from '@prisma/client';

import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import blogGuestService from './blog.service';

jest.mock('../../../lib/db.server', () => ({
  blog: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('blogGuestService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all blogs with total count', async () => {
      const mockBlogs: Blog[] = [
        {
          id: 1,
          accountId: 1,
          caption: 'Test Blog',
          image: 'image.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (database.blog.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBlogs)
        .mockResolvedValueOnce(mockBlogs);

      const pagination: Pagination = { page: 1, perPage: 10 };
      const result = await blogGuestService.getAll(pagination);

      expect(database.blog.findMany).toHaveBeenCalledTimes(2);
      expect(database.blog.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          account: true,
        },
        ...getQueryPagination(pagination),
      });
      expect(result).toEqual({
        total: mockBlogs.length,
        blogs: mockBlogs,
      });
    });
  });

  describe('get', () => {
    it('should return a blog by id', async () => {
      const mockBlog: Blog = {
        id: 1,
        accountId: 1,
        caption: 'Test Blog',
        image: 'image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (database.blog.findUnique as jest.Mock).mockResolvedValue(
        mockBlog
      );

      const result = await blogGuestService.get(1);

      expect(database.blog.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockBlog);
    });
  });
});
