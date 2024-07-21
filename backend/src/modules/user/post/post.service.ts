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
        invitation: {
          where: {
            NOT: {
              userAvailability: {
                accountId,
              },
              type: 'AVAILABLE', // Replace 'a' with the actual type if it's an enum or keep as is if it's a string
            },
          },
          include: {
            userAvailability: {
              include: {
                account: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
};

export default postUserService;
