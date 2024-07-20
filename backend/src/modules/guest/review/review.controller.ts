import { Review } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import reviewGuestService from './review.service';

const reviewGuestController = {
  getRating: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountId } = req.body;
      const ratings: { rating: number }[] =
        await reviewGuestService.getRating(accountId);
      // Kiểm tra nếu không có rating nào
      if (ratings.length === 0) {
        ResponseHandler(res, { avgRating: 0 });
      }
      // Tính tổng các rating
      const totalRatings = ratings.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      // Tính trung bình cộng
      const averageRating = totalRatings / ratings.length;
      ResponseHandler(res, { avgRating: averageRating });
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default reviewGuestController;
