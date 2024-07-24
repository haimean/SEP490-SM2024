import database from '../../../lib/db.server';

const reportBlogUserService = {
  create: async (data: any): Promise<any> => {
    const { reason, accountId, blogId } = data;
    return await database.reportBlog.create({
      data: {
        reason,
        accountId,
        blogId,
      },
    });
  },
};

export default reportBlogUserService;
