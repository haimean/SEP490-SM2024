import { NextFunction, Request, Response } from 'express';
import accountService from './account.service';
import CustomError from '../../../outcomes/customError';
import {
  ResponseHandler,
  ResponsePaginationHandler,
} from '../../../outcomes/responseHandler';
import { join } from 'path';
import { readFileSync } from 'fs';
import ejs from 'ejs';
import sendEmail from '../../../lib/sendEmail';

const getEmailContent = (link: string) => {
  const templatePath = join(
    __dirname,
    '../../../mailTemplate/sendBan.ejs'
  );
  const template = readFileSync(templatePath, 'utf8');
  return ejs.render(template, { link });
};
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
    const { reason } = req.body;

    try {
      const existAccount = await accountService.banAccount(
        parseInt(id)
      );
      const htmlContent = getEmailContent(reason);
      await sendEmail(
        existAccount.email,
        htmlContent,
        existAccount?.isActive !== true
          ? 'Tài khoản của bạn bị ban'
          : 'Tài khoản của bạn được mở',
        async (err: any) => {
          if (err) {
            next(new CustomError(err, 500));
          } else {
            ResponseHandler(res, existAccount);
          }
        }
      );
      // ResponseHandler(res, existAccount);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default accountController;
