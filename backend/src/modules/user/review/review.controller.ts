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
  getAllReviewUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountId } = req.params;
      const invitation: Review[] =
        await reviewUserService.getAllReviewOfUser(Number(accountId));
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getReviewUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountRecipientId } = req.params;
      const accountId = Number(req.headers.authorization);
      const invitation: Review[] =
        await reviewUserService.getReviewOfUser(
          Number(accountRecipientId),
          Number(accountId)
        );
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getReview: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const invitation: Review[] =
        await reviewUserService.getAllReviewOfUser(accountId);
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default reviewUserController;
