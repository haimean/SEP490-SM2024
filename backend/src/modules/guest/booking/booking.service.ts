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
        isDelete: false,
        post: {
          isNot: null,
        },
      },
      include: {
        bookingInfo: true,
        post: {
          include: {
            memberPost: true,
            invitation: true,
          },
        },
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
  getBookingPostLogin: async (accountId: number) => {
    return await database.booking.findMany({
      where: {
        startTime: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
        isDelete: false,
        post: {
          isNot: null,
        },
        accountId: {
          not: accountId,
        },
      },
      include: {
        bookingInfo: true,
        post: {
          include: {
            memberPost: true,
            invitation: true,
          },
        },
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
};

export default bookingGuestService;
