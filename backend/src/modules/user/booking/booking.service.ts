import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import { BookingCreateInput } from './booking.model';

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
        isDelete: false,
      },
    });
    console.log('🚀 ========= result:', result.length);
    const response = await database.booking.findMany({
      where: {
        accountId,
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
  getDetailBooking: async (id: number, accountId: number) => {
    return await database.booking.findFirst({
      where: {
        id,
        accountId,
        isDelete: false,
      },
      include: {
        bookingInfo: true,
        post: true,
        Court: {
          include: {
            Branches: {
              include: {
                address: true,
              },
            },
            TypeCourt: true,
          },
        },
      },
    });
  },
  create: async (data: BookingCreateInput) => {
    const {
      accountId,
      courtId,
      endTime,
      name,
      numberPhone,
      price,
      startTime,
    } = data;
    return await database.booking.create({
      data: {
        endTime,
        price,
        startTime,
        accountId,
        courtId,
        bookingInfo: {
          create: {
            name,
            numberPhone,
          },
        },
      },
      include: {
        bookingInfo: true,
      },
    });
  },
};

export default bookingUserService;
