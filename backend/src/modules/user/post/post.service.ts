import { Post } from '@prisma/client';
import database from '../../../lib/db.server';
import { PostInputCreate } from './post.model';

const postUserService = {
  create: async (data: PostInputCreate): Promise<Post | null> => {
    const {
      description,
      numberMember,
      bookingId,
      memberPost,
    } = data;
    return await database.post.create({
      data: {
        description,
        numberMember,
        bookingId,
        memberPost: {
          createMany: { data: memberPost },
        },
      },
    });
  },
};

export default postUserService;
