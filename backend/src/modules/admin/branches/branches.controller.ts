import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import branchesAdminService from './branches.service';
import { Branches } from '@prisma/client';
import NotFoundError from '../../../outcomes/notFoundError';

const branchesAdminController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await branchesAdminService.getAll();
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await branchesAdminService.get(id);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  setAccept: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const branches: Branches =
        await branchesAdminService.getDefault(id);
      if (branches) {
        const result = await branchesAdminService.setAccept(
          id,
          !branches.isAccept
        );
        ResponseHandler(res, result);
      } else {
        next(new NotFoundError('Không tìm thấy cơ sở'));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getAllWithAccount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const result = await branchesAdminService.getAllWithAccount(
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesAdminController;
