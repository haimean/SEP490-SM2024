import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import reviewUserService from './review.service';
import { Review } from '@prisma/client';

const reviewUserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accountRecipientId, rating, comment } = req.body;
      const accountSendId = Number(req.headers.authorization);
      const invitation: Review = await reviewUserService.create({
        accountSendId,
        accountRecipientId,
        rating,
        comment,
      });
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default reviewUserController;
