import { ReportBlog } from '@prisma/client';

import database from '../../../lib/db.server';
import blogAdminService from './blog.service';

jest.mock('../../../lib/db.server', () => ({
  reportBlog: {
    findMany: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
  },
  blog: {
    findFirst: jest.fn(),
    delete: jest.fn(),
  },
  account: {
    update: jest.fn(),
  },
  comment: {
    deleteMany: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('blogAdminService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllReport', () => {
    it('should return all reports with total count', async () => {
      const mockReports: ReportBlog[] = [
        {
          id: 1,
          reason: 'test reason',
          blogId: 1,
          accountId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (database.reportBlog.findMany as jest.Mock)
        .mockResolvedValueOnce(mockReports)
        .mockResolvedValueOnce(mockReports);

      const pagination = { page: 1, perPage: 10 };
      const result = await blogAdminService.getAllReport(pagination);

      expect(database.reportBlog.findMany).toHaveBeenCalled();
      expect(result).toEqual({
        total: mockReports.length,
        reports: mockReports,
      });
    });
  });

  describe('delete', () => {
    it('should delete a report by id', async () => {
      const mockReport: ReportBlog = {
        id: 1,
        reason: 'test reason',
        blogId: 1,
        accountId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (database.reportBlog.delete as jest.Mock).mockResolvedValue(
        mockReport
      );

      const result = await blogAdminService.delete(1);

      expect(database.reportBlog.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockReport);
    });
  });

  describe('banReport', () => {
    it('should ban a report and delete associated blog, comments, and update account', async () => {
      const mockReport = {
        id: 1,
        blogId: 1,
        accountId: 1,
        reason: 'test reason',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockBlog = {
        id: 1,
        accountId: 1,
        caption: 'Test Blog',
        image: 'image.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (database.reportBlog.findFirst as jest.Mock).mockResolvedValue(
        mockReport
      );
      (database.blog.findFirst as jest.Mock).mockResolvedValue(
        mockBlog
      );

      const result = await blogAdminService.banReport(1);

      expect(database.reportBlog.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(database.blog.findFirst).toHaveBeenCalledWith({
        where: { id: mockReport.blogId },
      });
      expect(database.reportBlog.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(database.account.update).toHaveBeenCalledWith({
        where: { id: mockBlog.accountId },
        data: { isActive: false },
      });
      expect(database.comment.deleteMany).toHaveBeenCalledWith({
        where: { blogId: mockReport.blogId },
      });
      expect(database.blog.delete).toHaveBeenCalledWith({
        where: { id: mockReport.blogId },
      });
    });
  });
});
