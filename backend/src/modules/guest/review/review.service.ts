import { Review } from '@prisma/client';
import database from '../../../lib/db.server';

const reviewGuestService = {
  getRating: async (
    accountId: number
  ): Promise<{ rating: number }[]> => {
    return await database.review.findMany({
      where: {
        accountRecipientId: accountId,
      },
      select: {
        rating: true,
      },
    });
  },
};

export default reviewGuestService;
