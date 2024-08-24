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
      include: {
        Court: {
          include: {
            Branches: true,
          },
        },
        post: {
          include: {
            invitation: {
              where: { status: 'ACCEPT' },
              include: {
                userAvailability: true,
              },
            },
          },
        },
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
      },
    });
    const response = await database.booking.findMany({
      where: {
        accountId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        bookingInfo: true,
        post: true,
        Court: {
          include: {
            Branches: {
              include: {
                account: {
                  include: {
                    user: true,
                  },
                },
                address: true,
                attributeBranches: {
                  include: {
                    attributeKeyBranches: true,
                  },
                },
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
                attributeBranches: {
                  include: {
                    attributeKeyBranches: true,
                  },
                },
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
  getCourt: async (id: number) => {
    return await database.court.findUnique({
      where: {
        id,
      },
      include: {
        Branches: true,
      },
    });
  },
  // check Booking có trùng lịch không
  checkBookingConflict: async (
    accountId: number,
    startTime: Date,
    endTime: Date,
    courtId: number
  ) => {
    const conflictingBooking = await database.booking.findFirst({
      where: {
        isDelete: false,
        courtId,
        startTime: {
          lte: new Date(endTime),
        },
        endTime: {
          gte: new Date(startTime),
        },
      },
    });
    return conflictingBooking !== null;
  },
};

export default bookingUserService;
