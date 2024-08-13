import { Review } from '@prisma/client';
import database from '../../../lib/db.server';
import { ReviewCreateInput } from './review.model';

const reviewUserService = {
  create: async (data: ReviewCreateInput): Promise<Review> => {
    const review = await database.review.findFirst({
      where: {
        accountRecipientId: data.accountRecipientId,
        accountSendId: data.accountSendId,
      },
    });
    if (review) {
      return await database.review.update({
        where: {
          id: review.id,
        },
        data: {
          comment: data.comment,
          rating: data.rating,
        },
      });
    } else {
      return await database.review.create({
        data,
      });
    }
  },

  getAllReviewOfUser: async (
    accountId: number
  ): Promise<Review[]> => {
    return await database.review.findMany({
      where: {
        accountRecipientId: accountId,
      },
      include: {
        accountSend: {
          include: {
            user: true,
          },
        },
        accountRecipient: {
          include: {
            user: true,
          },
        },
      },
    });
  },
  getReviewOfUser: async (
    accountRecipientId: number,
    accountId: number
  ): Promise<Review[]> => {
    return await database.review.findMany({
      where: {
        accountRecipientId,
        accountSendId: accountId,
      },
      include: {
        accountSend: {
          include: {
            user: true,
          },
        },
        accountRecipient: {
          include: {
            user: true,
          },
        },
      },
    });
  },
};

export default reviewUserService;
