import { Prisma, Review } from '@prisma/client';

import database from '../../../lib/db.server';
import { ReviewCreateInput } from './review.model';
import reviewUserService from './review.service';

jest.mock('../../../lib/db.server', () => ({
  review: {
    findFirst: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe('reviewUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should update the review if it already exists', async () => {
      const existingReview = {
        id: 1,
        comment: 'Old comment',
        rating: 4,
      } as Review;
      const updateInput: ReviewCreateInput = {
        accountRecipientId: 1,
        accountSendId: 2,
        comment: 'Updated comment',
        rating: 5,
      };

      (database.review.findFirst as jest.Mock).mockResolvedValue(
        existingReview
      );
      (database.review.update as jest.Mock).mockResolvedValue({
        ...existingReview,
        ...updateInput,
      });

      const result = await reviewUserService.create(updateInput);

      expect(database.review.findFirst).toHaveBeenCalledWith({
        where: {
          accountRecipientId: updateInput.accountRecipientId,
          accountSendId: updateInput.accountSendId,
        },
      });
      expect(database.review.update).toHaveBeenCalledWith({
        where: { id: existingReview.id },
        data: {
          comment: updateInput.comment,
          rating: updateInput.rating,
        },
      });
      expect(result).toEqual({ ...existingReview, ...updateInput });
    });

    it('should create a new review if it does not exist', async () => {
      const newReviewInput: ReviewCreateInput = {
        accountRecipientId: 1,
        accountSendId: 2,
        comment: 'New comment',
        rating: 5,
      };

      const createdReview = { id: 1, ...newReviewInput } as Review;

      (database.review.findFirst as jest.Mock).mockResolvedValue(
        null
      );
      (database.review.create as jest.Mock).mockResolvedValue(
        createdReview
      );

      const result = await reviewUserService.create(newReviewInput);

      expect(database.review.findFirst).toHaveBeenCalledWith({
        where: {
          accountRecipientId: newReviewInput.accountRecipientId,
          accountSendId: newReviewInput.accountSendId,
        },
      });
      expect(database.review.create).toHaveBeenCalledWith({
        data: newReviewInput,
      });
      expect(result).toEqual(createdReview);
    });
  });

  describe('getAllReviewOfUser', () => {
    it('should return all reviews for a specific user', async () => {
      const mockReviews: Review[] = [
        {
          id: 1,
          accountRecipientId: 1,
          accountSendId: 2,
          comment: 'Review 1',
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          accountRecipientId: 1,
          accountSendId: 3,
          comment: 'Review 2',
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (database.review.findMany as jest.Mock).mockResolvedValue(
        mockReviews
      );

      const result = await reviewUserService.getAllReviewOfUser(1);

      expect(database.review.findMany).toHaveBeenCalledWith({
        where: { accountRecipientId: 1 },
        include: {
          accountSend: {
            include: { user: true },
          },
          accountRecipient: {
            include: { user: true },
          },
        },
      });
      expect(result).toEqual(mockReviews);
    });
  });

  describe('getReviewOfUser', () => {
    it('should return the review from one user to another', async () => {
      const mockReviews: Review[] = [
        {
          id: 1,
          accountRecipientId: 1,
          accountSendId: 2,
          comment: 'Review 1',
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (database.review.findMany as jest.Mock).mockResolvedValue(
        mockReviews
      );

      const result = await reviewUserService.getReviewOfUser(1, 2);

      expect(database.review.findMany).toHaveBeenCalledWith({
        where: {
          accountRecipientId: 1,
          accountSendId: 2,
        },
        include: {
          accountSend: {
            include: { user: true },
          },
          accountRecipient: {
            include: { user: true },
          },
        },
      });
      expect(result).toEqual(mockReviews);
    });
  });
});
