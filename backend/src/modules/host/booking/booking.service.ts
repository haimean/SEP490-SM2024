import { Prisma } from '@prisma/client';
import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookingHostService = {
  getBookingList: async (
    accountId: number,
    pagination: Pagination
  ) => {
    const query = {
      where: {
        accountId,
        isDelete: false,
      },
      include: {},
      ...getQueryPagination(pagination),
      orderBy: {},
    };
    (query.orderBy = {
      startTime: 'desc',
    }),
      (query.include = {
        account: {
          include: {
            user: true,
          },
        },
        post: true,
        bookingInfo: true,
      });
    const result = await database.booking.findMany({
      where: {
        accountId,
      },
    });
    const response = await database.booking.findMany(query);
    return {
      data: response,
      total: result.length,
    };
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
  getBookingHostList: async (
    branchesId: number,
    accountId: number,
    pagination: Pagination,
    sort: { startTime: Prisma.SortOrder }
  ) => {
    const data = await database.booking.findMany({
      where: {
        isDelete: false,
        Court: {
          Branches: {
            id: branchesId,
            accountId,
            isDelete: false,
          },
        },
      },
      include: {
        bookingInfo: true,
        Court: true,
      },
      orderBy: [
        {
          startTime: sort.startTime,
        },
      ],
      ...getQueryPagination(pagination),
    });
    const total = await database.booking.findMany({
      where: {
        isDelete: false,
        Court: {
          Branches: {
            id: branchesId,
            accountId,
            isDelete: false,
          },
        },
      },
    });

    return { bookings: data, total: total.length };
  },

  getBookingHostByBranch: async (
    branchesId: number,
    pagination: Pagination
  ) => {
    const query = {
      where: {
        id: branchesId,
        isDelete: false,
        isAccept: true,
      },
      include: {},
      // ...getQueryPagination(pagination),
      // orderBy: {},
    };
    query.include = {
      court: {
        include: {
          booking: true,
        },
      },
    };
    const getAllBookings = (branchData: any) => {
      const bookings: any = [];
      branchData.court.forEach((court: any) => {
        court.booking.forEach((booking: any) => {
          bookings.push(booking);
        });
      });
      return bookings;
    };
    const response = await database.branches.findUnique(query);
    const data = getAllBookings(response);
    const skip = (pagination.page - 1) * pagination.perPage;
    const take = pagination.perPage;
    const paginatedBookings = data.slice(skip, skip + take);
    return {
      data: paginatedBookings,
      total: data.length,
    };
  },
  cancel: async (bookingId: number, reasonCancell: string) => {
    const response = await database.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isDelete: true,
        reasonCancell,
      },
    });
    return response;
  },
};

export default bookingHostService;
