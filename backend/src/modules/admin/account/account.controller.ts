import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../../../outcomes/responseHandler';
import accountService from './account.service';
import CustomError from '../../../outcomes/customError';

const accountController = {
  listAccount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, isVerify, email, currentPage, pageSize } =
        req.body;
      const result = await accountService.listAccount(
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

export default accountController;
