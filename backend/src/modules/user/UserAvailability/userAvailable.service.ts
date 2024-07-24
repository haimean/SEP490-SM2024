import { AddressBranch, Booking, Post, Prisma } from '@prisma/client';
import database from '../../../lib/db.server';

const userAvailableService = {
  listAvailable: async (
    startTime: Date,
    endTime: Date,
    provinces: string,
    districts: string
  ) => {
    const filters: Prisma.UserAvailabilityWhereInput = {};

    if (startTime) {
      filters.startTime = { gte: new Date(startTime) };
    }

    if (endTime) {
      filters.endTime = { lte: new Date(endTime) };
    }
    if (districts) {
      filters.districts = {
        contains: districts,
      };
    }
    if (provinces) {
      filters.provinces = {
        contains: provinces,
      };
    }
    return await database.userAvailability.findMany({
      where: filters,
    });
  },
  getUserFree: async (postId: number) => {
    // GET  booking -> start time end time
    const booking: any = database.booking.findFirst({
      where: {
        post: {
          id: postId,
        },
      },
    });
    // get branche
    const address: any = database.addressBranch.findFirst({
      where: {
        branches: {
          court: {
            every: {
              booking: {
                every: {
                  post: {
                    id: postId,
                  },
                },
              },
            },
          },
        },
      },
    });
    // TODO: check giờ trùng
    const user = database.userAvailability.findMany({
      where: {
        startTime: { gte: booking.startTime },
        endTime: { lte: booking.startTime },
        districts: address.districts,
        provinces: address.provinces,
        Invitation: {
          none: {
            postId,
          },
        },
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
    });
    return user;
  },

  getUserMatch: async (postId: number) => {
    return database.userAvailability.findMany({
      where: {
        Invitation: {
          every: {
            postId,
            status: 'NEW',
          },
        },
      },
      include: {
        Invitation: {
          where: {
            postId,
            status: 'NEW',
          },
        },
        account: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  getUserAccept: async (postId: number) => {
    return database.userAvailability.findMany({
      where: {
        Invitation: {
          every: {
            postId,
            status: 'ACCEPT',
          },
        },
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
      },
    });
  },
};
export default userAvailableService;
