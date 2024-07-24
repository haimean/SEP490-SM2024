import { Post } from '@prisma/client';
import database from '../../../lib/db.server';
import { PostInputCreate } from './post.model';

const postUserService = {
  create: async (data: PostInputCreate): Promise<Post | null> => {
    const { description, numberMember, bookingId, memberPost } = data;
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
  get: async (id: number, accountId: number): Promise<any> => {
    return await database.post.findUnique({
      where: {
        id,
        booking: {
          accountId,
        },
      },
      include: {
        booking: {
          include: {
            Court: {
              include: {
                TypeCourt: true,
                Branches: {
                  include: {
                    attributeBranches: true,
                    address: true,
                    account: true,
                  },
                },
              },
            },
            bookingInfo: true,
          },
        },
        memberPost: true,
      },
    });
  },
};

export default postUserService;
