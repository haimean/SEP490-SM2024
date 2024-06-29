import { NextFunction, Request, Response } from 'express';
import branchService from './branch.service';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';

const branchController = {
  listBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, isVerify, email, currentPage, pageSize } =
        req.body;
      const result = await branchService.listBranch(
        name,
        isVerify,
        email,
        Number(currentPage),
        Number(pageSize)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchController;
