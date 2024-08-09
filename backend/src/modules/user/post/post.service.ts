import { Post } from '@prisma/client';
import database from '../../../lib/db.server';
import { PostInputCreate } from './post.model';

const postUserService = {
  create: async (data: PostInputCreate): Promise<Post | null> => {
    const {
      title,
      description,
      numberMember,
      bookingId,
      memberPost,
    } = data;
    return await database.post.create({
      data: {
        title,
        description,
        numberMember,
        bookingId,
        memberPost: {
          createMany: { data: memberPost },
        },
      },
    });
  },
  get: async (id: number): Promise<any> => {
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
          include: {
            userAvailability: {
              include: {
                account: true,
              },
            },
          },
        },
      },
    });
  },
};

export default postUserService;
