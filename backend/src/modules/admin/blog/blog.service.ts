import { report } from 'superagent';
import { getQueryPagination } from '../../index.service';
import { Pagination } from '../../index.model';
import { ReportBlog } from '@prisma/client';
import database from '../../../lib/db.server';
import { getObjectSignedUrl } from '../../../lib/s3';

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
    const total = await database.reportBlog.findMany();
    reports;
    for (let report of reports) {
      report.blog.image = await getObjectSignedUrl(report.blog.image);
    }
    return { total: total.length, reports };
  },
  delete: async (id: number): Promise<ReportBlog> => {
    return await database.reportBlog.delete({
      where: { id },
    });
  },
  banReport: async (id: number): Promise<any> => {
    const report = await database.reportBlog.findFirst({
      where: { id },
    });
    const blog = await database.blog.findFirst({
      where: { id: report?.blogId },
    });
    if (report) {
      await database.reportBlog.delete({
        where: { id },
      });
      await database.account.update({
        where: {
          id: blog?.accountId,
        },
        data: {
          isActive: false,
        },
      });
      await database.comment.deleteMany({
        where: { blogId: report?.blogId },
      });
      return await database.blog.delete({
        where: { id: report?.blogId },
      });
    }
  },
};

export default blogAdminService;
