import { Account } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import forgotPasswordService from './forgotPassword.service';
import CustomError from '../../../outcomes/customError';

const forgotPasswordMiddleware = {
  findEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      const account: Account | null =
        await forgotPasswordService.findEmail(email);
      if (account) {
        req.body.account = account;
        next();
      } else {
        next(new CustomError('Email does not exist.', 409));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default forgotPasswordMiddleware;
