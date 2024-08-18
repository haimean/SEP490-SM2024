import database from '../../../lib/db.server';
import reviewGuestService from './review.service';

jest.mock('../../../lib/db.server', () => ({
  review: {
    findMany: jest.fn(),
  },
}));

describe('reviewGuestService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRating', () => {
    it('should return ratings for the specified account', async () => {
      const mockRatings = [{ rating: 5 }, { rating: 4 }];
      (database.review.findMany as jest.Mock).mockResolvedValue(
        mockRatings
      );

      const result = await reviewGuestService.getRating(1);

      expect(database.review.findMany).toHaveBeenCalledWith({
        where: {
          accountRecipientId: 1,
        },
        select: {
          rating: true,
        },
      });
      expect(result).toEqual(mockRatings);
    });
  });
});
