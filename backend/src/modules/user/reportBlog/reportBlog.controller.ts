import { NextFunction, Request, Response } from 'express';
import reportBlogUserService from './reportBlog.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const reportBlogUserController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { reason } = req.body;
    const accountId = Number(req.headers.authorization);
    const blogId = Number(req.params.blogId);
    try {
      const result = await reportBlogUserService.create({
        reason,
        accountId,
        blogId,
      });
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default reportBlogUserController;
