import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookingUserService = {
  remove: async (id: number, accountId: number) => {
    return await database.booking.update({
      where: {
        id,
        accountId,
      },
      data: {
        isDelete: true,
      },
    });
  },
  getAllForUser: async (
    accountId: number,
    pagination: Pagination
  ) => {
    const result = await database.booking.findMany({
      where: {
        accountId,
        post: {
          isNot: null,
        },
        isDelete: false,
      },
    });
    console.log('🚀 ========= result:', result.length);
    const response = await database.booking.findMany({
      where: {
        accountId,
        post: {
          isNot: null,
        },
        isDelete: false,
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
    return { response, total: result.length };
  },
  // getDetailBookingHistoryList: async (accountId: number) => {
  //   return await database.booking.findMany({
  //     where: {
  //       accountId,
  //       post: {
  //         isNot: null,
  //       },
  //       isDelete: false,
  //     },
  //     include: {
  //       bookingInfo: true,
  //       post: true,
  //       Court: {
  //         include: {
  //           Branches: {
  //             include: {
  //               attributeBranches: {
  //                 include: {
  //                   attributeKeyBranches: true,
  //                 },
  //               },
  //               address: true,
  //             },
  //           },
  //           TypeCourt: true,
  //         },
  //       },
  //     },
  //   });
  // },
};

export default bookingUserService;
