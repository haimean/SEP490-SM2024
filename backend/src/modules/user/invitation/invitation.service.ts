import { Invitation, Post, TypeInvitation } from '@prisma/client';
import database from '../../../lib/db.server';

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
};

export default invitationUserService;
