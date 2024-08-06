import {
  Invitation,
  Post,
  StatusInvitation,
  TypeInvitation,
} from '@prisma/client';
import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const invitationUserService = {
  create: async (
    type: TypeInvitation,
    userAvailabilityId: number,
    postId: number
  ): Promise<Invitation> => {
    return await database.invitation.create({
      data: {
        userAvailabilityId,
        postId,
        type,
        status: 'NEW',
      },
    });
  },
  getInvitation: async (accountId: number, postId: number) => {
    return await database.invitation.findMany({
      where: {
        postId,
        userAvailability: {
          accountId,
        },
      },
    });
  },
  getUserAvailability: async (
    userAvailabilityId: number
  ): Promise<any> => {
    return await database.userAvailability.findUnique({
      where: {
        id: userAvailabilityId,
      },
    });
  },

  getAvailable: async (
    postId: number,
    accountId: number
  ): Promise<any> => {
    return await database.invitation.findFirst({
      where: {
        postId,
        userAvailability: {
          accountId: accountId,
        },
      },
    });
  },

  createForPlayer: async (
    type: TypeInvitation,
    postId: number,
    accountId: number
  ): Promise<any> => {
    const post = await database.post.findUnique({
      where: { id: postId },
      include: {
        booking: {
          include: {
            Court: {
              include: {
                Branches: { include: { address: true } },
              },
            },
          },
        },
      },
    });
    const userAvailability = await database.userAvailability.create({
      data: {
        districts:
          post?.booking.Court?.Branches?.address?.districts ?? '',
        endTime: post?.booking.startTime as Date,
        startTime: post?.booking.startTime as Date,
        provinces:
          post?.booking.Court?.Branches?.address?.provinces ?? '',
        accountId,
      },
    });
    return await database.invitation.create({
      data: {
        postId,
        type,
        status: 'NEW',
        userAvailabilityId: userAvailability.id,
      },
      include: {
        userAvailability: true,
        Post: {
          include: {
            booking: true,
          },
        },
      },
    });
  },
  getPost: async (postId: number): Promise<Post | null> => {
    return await database.post.findUnique({
      where: { id: postId },
    });
  },
  getAllUnavailable: async (
    postId: number,
    pagination: Pagination
  ): Promise<{ data: Invitation[]; total: number }> => {
    const total = await database.invitation.findMany({
      where: { postId },
    });
    const data = await database.invitation.findMany({
      where: { postId },
      include: {
        Post: {
          include: {
            memberPost: true,
            booking: {
              include: {
                bookingInfo: true,
                Court: {
                  include: {
                    TypeCourt: {
                      include: {
                        attributeCourt: true,
                        priceTypeCourt: true,
                      },
                    },

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
                  },
                },
              },
            },
          },
        },
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
      ...getQueryPagination(pagination),
    });
    return { data, total: total.length };
  },

  getUnavailableOfUser: async (
    accountId: number,
    pagination: Pagination
  ): Promise<{ data: Invitation[]; total: number }> => {
    const total = await database.invitation.findMany({
      where: {
        userAvailability: {
          accountId,
        },
        type: 'UNAVAILABLE',
      },
    });
    const data = await database.invitation.findMany({
      where: {
        userAvailability: {
          accountId,
        },
        type: 'UNAVAILABLE',
      },
      include: {
        Post: {
          include: {
            memberPost: true,
            booking: {
              include: {
                bookingInfo: true,
                Court: {
                  include: {
                    TypeCourt: {
                      include: {
                        attributeCourt: true,
                        priceTypeCourt: true,
                      },
                    },

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
                  },
                },
              },
            },
          },
        },
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
      ...getQueryPagination(pagination),
    });
    return { data, total: total.length };
  },
  update: async (data: {
    invitationId: number;
    status: StatusInvitation;
    reasonCancel: string;
  }) => {
    const { invitationId, status, reasonCancel } = data;
    return database.invitation.update({
      where: {
        id: invitationId,
      },
      data: {
        status,
        reasonCancel,
      },
      include: {
        Post: {
          include: {
            booking: {
              include: {
                account: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
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
    });
  },
};

export default invitationUserService;
