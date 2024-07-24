import { NextFunction, Request, Response } from 'express';
import commentUserService from './comment.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const commentUserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const result = await commentUserService.create(
        accountId,
        req.body
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default commentUserController;
