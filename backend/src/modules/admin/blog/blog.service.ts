import { report } from 'superagent';
import { getQueryPagination } from '../../index.service';
import { Pagination } from '../../index.model';
import { ReportBlog } from '@prisma/client';
import database from '../../../lib/db.server';

const blogAdminService = {
  getAllReport: async (
    pagination: Pagination
  ): Promise<{ total: number; reports: ReportBlog[] }> => {
    const reports = await database.reportBlog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        blog: {
          include: {
            account: {
              include: { user: true },
            },
          },
        },
        account: {
          include: {
            user: true,
          },
        },
      },
      ...getQueryPagination(pagination),
    });
    const total = await database.blog.findMany();
    return { total: total.length, reports };
  },
  delete: async (id: number): Promise<ReportBlog> => {
    return await database.reportBlog.delete({
      where: { id },
    });
  },
  banReport: async (id: number): Promise<ReportBlog> => {
    const report = await database.reportBlog.findFirst({
      where: { id },
    });
    if (report) {
      await database.blog.delete({ where: { id: report?.blogId } });
      await database.account.update({
        where: {
          id: report.accountId,
        },
        data: {
          isActive: false,
        },
      });
    }
    return await database.reportBlog.delete({
      where: { id },
    });
  },
};

export default blogAdminService;
