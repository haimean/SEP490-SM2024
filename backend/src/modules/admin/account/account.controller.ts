import { NextFunction, Request, Response } from 'express';
import accountService from './account.service';
import CustomError from '../../../outcomes/customError';
import {
  ResponseHandler,
  ResponsePaginationHandler,
} from '../../../outcomes/responseHandler';

const accountController = {
  listAccount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, isVerify, email, pagination } = req.body;
      const result = await accountService.listAccount(
        name,
        isVerify,
        email,
        pagination
      );
      ResponsePaginationHandler(
        res,
        result.result,
        result.totalCount
      );
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  banAccount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      const existAccount = await accountService.banAccount(
        parseInt(id)
      );
      ResponseHandler(res, existAccount);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default accountController;
