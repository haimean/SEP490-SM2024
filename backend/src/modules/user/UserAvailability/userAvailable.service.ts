import {
  AddressBranch,
  Booking,
  Level,
  Post,
  Prisma,
  StatusInvitation,
} from '@prisma/client';
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

  // get detail post with id
  getPost: async (id: number) => {
    return await database.post.findUnique({
      where: {
        id,
      },
      include: {
        memberPost: true,
        booking: {
          include: {
            Court: {
              include: {
                Branches: {
                  include: {
                    address: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  // get userAvailable with same level, districts, provinces and same day
  getUserAvailableSamePost: async (data: {
    provinces: string;
    districts: string;
    date: Date;
  }) => {
    const { provinces, districts, date } = data;
    const year = date.getFullYear();
    const month = date.getMonth(); // Note: Months in JavaScript start at 0
    const day = date.getDate();
    // Create beginning of day and end of day
    const startOfDay = new Date(year, month, day, 0, 0, 0);
    const endOfDay = new Date(year, month, day, 23, 59, 59);
    return await database.userAvailability.findMany({
      where: {
        districts,
        provinces,
        startTime: {
          gte: startOfDay,
          lte: endOfDay,
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
  getInvitation: async (accountId: number, postId: number) => {
    return await database.invitation.findMany({
      where: {
        postId,
        status: {
          not: 'CANCEL',
        },
        userAvailability: {
          accountId,
        },
      },
    });
  },
  getBookingFindByTime: async (
    accountId: number,
    startTime: Date,
    endTime: Date
  ) => {
    return await database.booking.findMany({
      where: {
        accountId,
        isDelete: false,
        OR: [
          {
            startTime: {
              gte: startTime,
              lte: endTime,
            },
          },
          {
            endTime: {
              gte: startTime,
              lte: endTime,
            },
          },
        ],
      },
    });
  },
  getInvitationFindByTime: async (
    accountId: number,
    startTime: Date,
    endTime: Date
  ) => {
    return await database.invitation.findMany({
      where: {
        userAvailability: {
          accountId,
        },
        status: 'ACCEPT',
        Post: {
          booking: {
            OR: [
              {
                startTime: {
                  gte: startTime,
                  lte: endTime,
                },
              },
              {
                endTime: {
                  gte: startTime,
                  lte: endTime,
                },
              },
            ],
          },
        },
      },
    });
  },
  getUserMatch: async (postId: number) => {
    const invitation: any = await database.invitation.findMany({
      where: {
        postId,
        status: 'NEW',
      },
      include: {
        userAvailability: {
          include: {
            Invitation: {
              where: {
                status: 'NEW',
                postId,
              },
            },
            account: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return invitation.map((item: any) => item.userAvailability);
  },
  getUserAccept: async (postId: number) => {
    const invitation: any = await database.invitation.findMany({
      where: {
        postId,
        status: 'ACCEPT',
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
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return invitation;
  },
  getRequestListJoin: async (
    accountId: number,
    status: StatusInvitation
  ) => {
    const requestList: any = await database.invitation.findMany({
      where: {
        type: 'UNAVAILABLE',
        status,
        userAvailability: {
          accountId,
        },
      },
      include: {
        Post: {
          include: {
            booking: {
              include: {
                bookingInfo: true,
                account: {
                  include: {
                    user: true,
                  },
                },
                Court: {
                  include: {
                    Branches: {
                      include: {
                        address: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return requestList;
  },
};
export default userAvailableService;
