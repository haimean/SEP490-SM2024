import { Post } from '@prisma/client';
import database from '../../../lib/db.server';
import { getQueryPagination } from './../../index.service';

const postService = {
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
  getTopThree: async (): Promise<any> => {
    return await database.post.findMany({
      where: {
        booking: {
          isDelete: false,
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
      orderBy: {
        createdAt: 'desc',
      },
      ...getQueryPagination({
        page: 1,
        perPage: 3,
      }),
    });
  },
};

export default postService;
