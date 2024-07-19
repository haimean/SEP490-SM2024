import { Review } from '@prisma/client';
import database from '../../../lib/db.server';
import { ReviewCreateInput } from './review.model';

const reviewUserService = {
  create: async (data: ReviewCreateInput): Promise<Review> => {
    return await database.review.create({
      data,
    });
  },
};

export default reviewUserService;
