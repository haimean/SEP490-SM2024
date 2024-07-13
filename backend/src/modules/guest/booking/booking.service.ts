import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookingGuestService = {
  getBookingPost: async () => {
    return await database.booking.findMany({
      where: {
        startTime: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
        post: {
          isNot: null,
        },
      },
      include: {
        bookingInfo: true,
        post: true,
        Court: {
          include: {
            Branches: {
              include: {
                attributeBranches: {
                  include: {
                    attributeKeyBranches: true,
                  },
                },
                address: true,
              },
            },
            TypeCourt: true,
          },
        },
      },
    });
  },
  getAllForUser: async (
    accountId: number,
    pagination: Pagination
  ) => {
    return await database.booking.findMany({
      where: {
        accountId,
        post: {
          isNot: null,
        },
      },
      include: {
        bookingInfo: true,
        post: true,
        Court: {
          include: {
            Branches: {
              include: {
                attributeBranches: {
                  include: {
                    attributeKeyBranches: true,
                  },
                },
                address: true,
              },
            },
            TypeCourt: true,
          },
        },
      },
      ...getQueryPagination(pagination),
    });
  },
};

export default bookingGuestService;
