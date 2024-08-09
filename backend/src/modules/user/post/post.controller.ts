import { NextFunction, Request, Response } from 'express';
import postUserService from './post.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const postUserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const {
      bookingId,
      description,
      numberMember,
      memberPost,
      title,
    } = req.body;
    try {
      const result = await postUserService.create({
        title,
        bookingId,
        description,
        numberMember,
        memberPost,
      });
      if (result) {
        ResponseHandler(res, result);
      } else {
        next(new CustomError('Bài đăng đã tồn tại', 500));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await postUserService.get(id);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default postUserController;
