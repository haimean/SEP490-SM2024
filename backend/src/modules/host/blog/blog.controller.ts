import { NextFunction, Request, Response } from 'express';
import { deleteFile, uploadFile } from '../../../lib/s3';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { Blog } from '@prisma/client';
import blogHostService from './blog.service';
import NotFoundError from '../../../outcomes/notFoundError';

const blogHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    let imageName: string = '';
    const file = req.file;
    //check file
    if (file) {
      imageName = await uploadFile(file);
    }

    try {
      const accountId = Number(req.headers.authorization);
      const { caption } = req.body;
      const blog: Blog = await blogHostService.create({
        accountId,
        caption,
        image: imageName,
      });
      ResponseHandler(res, blog);
    } catch (error: any) {
      if (imageName) deleteFile(imageName);
      next(new CustomError(error?.message, 500));
    }
  },
  getAllOfUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const blogs: Blog[] = await blogHostService.getAll(accountId);
      ResponseHandler(res, blogs);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getArchivedDOfUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const blogs: Blog[] = await blogHostService.getAll(accountId);
      ResponseHandler(res, blogs);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogHostService.get(Number(id));
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
    let imageName: string = '';
    const file = req.file;
    //check file
    if (file) {
      imageName = await uploadFile(file);
    }

    try {
      const accountId = Number(req.headers.authorization);
      const { caption } = req.body;
      const { id } = req.params;
      const blog: Blog = await blogHostService.update(Number(id), {
        accountId,
        caption,
        image: imageName,
      });
      ResponseHandler(res, blog);
    } catch (error: any) {
      if (imageName) deleteFile(imageName);
      next(new CustomError(error?.message, 500));
    }
  },
};

export default blogHostController;
