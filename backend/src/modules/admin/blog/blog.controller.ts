import { NextFunction, Request, Response } from 'express';
import blogAdminService from './blog.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { ReportBlog } from '@prisma/client';

const blogAdminController = {
  getAllReport: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const data: { total: number; reports: ReportBlog[] } =
        await blogAdminService.getAllReport(pagination);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  banReport: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const data: ReportBlog = await blogAdminService.banReport(
        Number(id)
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data: ReportBlog = await blogAdminService.delete(
        Number(id)
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default blogAdminController;
