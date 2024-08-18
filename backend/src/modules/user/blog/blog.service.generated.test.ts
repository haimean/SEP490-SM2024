import { Blog, Comment } from '@prisma/client';

import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import { BlogInput } from './blog.model';
import blogUserService from './blog.service';

jest.mock('../../../lib/db.server', () => ({
  blog: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  comment: {
    deleteMany: jest.fn(),
    findMany: jest.fn(),
  },
  reportBlog: {
    deleteMany: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('blogUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new blog with the provided data', async () => {
      const blogData: BlogInput = {
        accountId: 1,
        caption: 'Test Blog',
        image: 'image-url',
      };

      const mockBlog = {
        id: 1,
        ...blogData,
      } as Blog;

      (database.blog.create as jest.Mock).mockResolvedValue(mockBlog);

      const result = await blogUserService.create(blogData);

      expect(database.blog.create).toHaveBeenCalledWith({
        data: blogData,
      });
      expect(result).toEqual(mockBlog);
    });
  });

  describe('delete', () => {
    it('should delete a blog and its related comments and reports', async () => {
      const mockBlog = {
        id: 1,
        accountId: 1,
        caption: 'Test Blog',
        image: 'image-url',
      } as Blog;

      (database.blog.delete as jest.Mock).mockResolvedValue(mockBlog);

      const result = await blogUserService.delete(1);

      expect(database.comment.deleteMany).toHaveBeenCalledWith({
        where: {
          blogId: 1,
        },
      });
      expect(database.reportBlog.deleteMany).toHaveBeenCalledWith({
        where: {
          blogId: 1,
        },
      });
      expect(database.blog.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
      expect(result).toEqual(mockBlog);
    });
  });

  describe('update', () => {
    it('should update a blog with the provided data', async () => {
      const blogData: BlogInput = {
        accountId: 1,
        caption: 'Updated Blog',
        image: 'updated-image-url',
      };

      const mockBlog = {
        id: 1,
        ...blogData,
      } as Blog;

      (database.blog.update as jest.Mock).mockResolvedValue(mockBlog);

      const result = await blogUserService.update(1, blogData);

      expect(database.blog.update).toHaveBeenCalledWith({
        where: {
          id: 1,
          accountId: 1,
        },
        data: {
          caption: blogData.caption,
          image: blogData.image,
        },
      });
      expect(result).toEqual(mockBlog);
    });
  });

  describe('getAll', () => {
    it('should return all blogs with pagination and related account data', async () => {
      const mockBlogs = [
        {
          id: 1,
          accountId: 1,
          caption: 'Test Blog',
          image: 'image-url',
          account: {
            id: 1,
            user: { id: 1, name: 'Test User' },
          },
        },
      ];

      (database.blog.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBlogs)
        .mockResolvedValueOnce(mockBlogs);

      const pagination: Pagination = { page: 1, perPage: 10 };
      const result = await blogUserService.getAll(pagination);

      expect(database.blog.findMany).toHaveBeenCalledTimes(2);
      expect(database.blog.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual({
        total: mockBlogs.length,
        blogs: mockBlogs,
      });
    });
  });

  describe('get', () => {
    it('should return a blog by id with related account data', async () => {
      const mockBlog = {
        id: 1,
        accountId: 1,
        caption: 'Test Blog',
        image: 'image-url',
        account: {
          id: 1,
          user: { id: 1, name: 'Test User' },
        },
      };

      (database.blog.findUnique as jest.Mock).mockResolvedValue(
        mockBlog
      );

      const result = await blogUserService.get(1);

      expect(database.blog.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: {
          account: {
            include: {
              user: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBlog);
    });
  });

  describe('getComment', () => {
    it('should return all comments for a blog by id with related account data', async () => {
      const mockComments = [
        {
          id: 1,
          blogId: 1,
          content: 'Test Comment',
          account: {
            id: 1,
            user: { id: 1, name: 'Test User' },
          },
        },
      ];

      (database.comment.findMany as jest.Mock).mockResolvedValue(
        mockComments
      );

      const result = await blogUserService.getComment(1);

      expect(database.comment.findMany).toHaveBeenCalledWith({
        where: {
          blogId: 1,
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
      expect(result).toEqual(mockComments);
    });
  });

  describe('getCommentNew', () => {
    it('should return the latest 3 comments for a blog by id with related account data', async () => {
      const mockComments = [
        {
          id: 1,
          blogId: 1,
          content: 'Test Comment',
          account: {
            id: 1,
            user: { id: 1, name: 'Test User' },
          },
        },
      ];

      (database.comment.findMany as jest.Mock).mockResolvedValue(
        mockComments
      );

      const result = await blogUserService.getCommentNew(1);

      expect(database.comment.findMany).toHaveBeenCalledWith({
        where: {
          blogId: 1,
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
        ...getQueryPagination({ page: 1, perPage: 3 }),
      });
      expect(result).toEqual(mockComments);
    });
  });
});
