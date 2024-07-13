import { NextFunction, Request, Response } from 'express';
import blogAdminService from './blog.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import NotFoundError from '../../../outcomes/notFoundError';
import { Blog } from '@prisma/client';

const blogAdminController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogs: Blog[] = await blogAdminService.getAll();
      ResponseHandler(res, blogs);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogAdminService.get(
        Number(id)
      );
      if (blog) {
        ResponseHandler(res, blog);
      } else {
        next(new NotFoundError('Khồng tìm thấy bài viết'));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const { status } = req.body;
      const { id } = req.params;
      const blog: Blog = await blogAdminService.update(
        Number(id),
        status
      );
      ResponseHandler(res, blog);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default blogAdminController;
