import { NextFunction, Request, Response } from 'express';
import blogGuestService from './blog.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import NotFoundError from '../../../outcomes/notFoundError';
import { Blog } from '@prisma/client';
import { getObjectSignedUrl } from '../../../lib/s3';

const blogGuestController = {
  getAllOfUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const data: { total: number; blogs: Blog[] } =
        await blogGuestService.getAll(pagination);

      for (let index = 0; index < data.blogs.length; index++) {
        if (data.blogs[index]?.image) {
          data.blogs[index].image = await getObjectSignedUrl(
            data.blogs[index]?.image
          );
        }
      }
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogGuestService.get(
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
};

export default blogGuestController;
