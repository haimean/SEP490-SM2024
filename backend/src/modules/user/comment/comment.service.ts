import database from '../../../lib/db.server';

const commentUserService = {
  create: async (accountId: number, data: any) => {
    const { content, blogId } = data;
    return await database.comment.create({
      data: {
        content,
        blogId,
        accountId,
      },
    });
  },
  delete: async (accountId: number, id: number) => {
    return await database.comment.delete({
      where: {
        id,
        accountId,
      },
    });
  },
};

export default commentUserService;
