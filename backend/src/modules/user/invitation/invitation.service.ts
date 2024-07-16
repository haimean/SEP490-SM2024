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
  getRequestsToTheMatch: async (
    accountSendId: number,
    postId: number
  ): Promise<Invitation | null> => {
    return await database.invitation.findFirst({
      where: {
        postId,
        status: 'UNAVAILABLE',
        accountSendId,
      },
    });
  },

  getPost: async (postId: number): Promise<Post | null> => {
    return await database.post.findUnique({
      where: { id: postId },
    });
  },

  createInvitePlayer: async (
    idCreate: number,
    idInvite: number,
    postId: number
  ) => {
    return await database.invitation.create({
      data: {
        accountSendId: idCreate,
        accountRecipientId: idInvite,
        postId: postId,
        status: 'AVAILABLE',
      },
    });
  },
};

export default invitationUserService;
