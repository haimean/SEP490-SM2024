import { NextFunction, Request, Response } from 'express';
import {
  deleteFile,
  uploadFile,
} from '../../../lib/upLoadImageService';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { Blog } from '@prisma/client';
import blogUserService from './blog.service';
import NotFoundError from '../../../outcomes/notFoundError';

const blogUserController = {
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
      const blog: Blog = await blogUserService.create({
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
      const { pagination } = req.body;
      const data: { total: number; blogs: Blog[] } =
        await blogUserService.getAll(pagination);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogUserService.delete(
        Number(id)
      );
      ResponseHandler(res, blog);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogUserService.get(Number(id));
      if (blog) {
        ResponseHandler(res, blog);
      } else {
        next(new NotFoundError('Khồng tìm thấy bài viết'));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getComment: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogUserService.getComment(
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

  getCommentNew: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const blog: Blog | null = await blogUserService.getCommentNew(
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
      const blog: Blog = await blogUserService.update(Number(id), {
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
  // delete: async (req: Request, res: Response, next: NextFunction) => {

  //   try {
  //     const accountId = Number(req.headers.authorization);
  //     const { id } = req.params;
  //     const blog: Blog = await blogUserService.update(Number(id)
  //       accountId,
  //     );
  //     ResponseHandler(res, blog);
  //   } catch (error: any) {
  //     if (imageName) deleteFile(imageName);
  //     next(new CustomError(error?.message, 500));
  //   }
  // },
};

export default blogUserController;
