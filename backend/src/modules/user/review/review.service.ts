import { Review } from '@prisma/client';
import database from '../../../lib/db.server';
import { ReviewCreateInput } from './review.model';

const reviewUserService = {
  create: async (data: ReviewCreateInput): Promise<Review> => {
    return await database.review.create({
      data,
    });
  },
  getReviewUser: async (accountId: number): Promise<Review[]> => {
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
      },
    });
  },
};

export default reviewUserService;
