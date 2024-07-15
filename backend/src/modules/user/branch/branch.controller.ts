import { NextFunction, Request, Response } from 'express';
import branchUserService from './branch.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const branchUserController = {
  listBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const result = await branchUserService.listBranch(accountId);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchUserController;
