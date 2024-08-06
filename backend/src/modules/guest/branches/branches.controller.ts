import { NextFunction, Request, Response } from 'express';
import branchesGuestService from './branches.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const branchesGuestController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await branchesGuestService.getAll();
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await branchesGuestService.get(id);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getTopThree: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await branchesGuestService.getTopThree();
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesGuestController;
