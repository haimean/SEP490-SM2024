import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import userAvailableService from './userAvailable.service';

const userAvailableController = {
  listAvailable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { startTime, endTime, provinces, districts } = req.body;
    try {
      const result = await userAvailableService.listAvailable(
        startTime,
        endTime,
        provinces,
        districts
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getUserFree: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      const result = await userAvailableService.getUserFree(
        Number(postId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getUserMatch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      const result = await userAvailableService.getUserMatch(
        Number(postId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getUserAccept: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      const result = await userAvailableService.getUserAccept(
        Number(postId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default userAvailableController;
