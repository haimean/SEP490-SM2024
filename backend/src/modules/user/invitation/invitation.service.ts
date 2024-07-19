import { Invitation, Post, TypeInvitation } from '@prisma/client';
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
};

export default invitationUserService;
