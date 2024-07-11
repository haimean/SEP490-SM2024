import { Invitation, Post } from '@prisma/client';
import database from '../../../lib/db.server';

const invitationUserService = {
  createRequestsToTheMatch: async (
    accountSendId: number,
    accountRecipientId: number,
    postId: number
  ): Promise<Invitation> => {
    return await database.invitation.create({
      data: {
        accountSendId,
        accountRecipientId,
        status: 'UNAVAILABLE',
        postId,
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
