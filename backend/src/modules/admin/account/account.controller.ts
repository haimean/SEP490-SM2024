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
      const { name, isVerify, email, pagination } = req.body;
      const result = await accountService.listAccount(
        name,
        isVerify,
        email,
        pagination
      );
      ResponseHandler(res, result);
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
      console.log('🚀 ========= existAccount:', existAccount);
      ResponseHandler(res, existAccount);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default accountController;
