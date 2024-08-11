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
import dateUtils from '../../../utils/date';

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
  listMonthAccount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await accountService.listMonthAccount();
      const resultPrevious =
        await accountService.listPreviousMonthAccount();

      ResponseHandler(res, {
        accounts: result,
        percentage:
          resultPrevious.length !== 0
            ? result.length / resultPrevious.length - 1
            : 3,
      });
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getListAccountNoSort: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await accountService.getListAccountNoSort();
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getListAccount12MonthLatest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = [];
      for (const item of dateUtils.getList12Month()) {
        const resultHost =
          await accountService.getListAccount12MonthLatest(
            item,
            'HOST'
          );
        const resultPlayer =
          await accountService.getListAccount12MonthLatest(
            item,
            'USER'
          );
        result.push({
          host: resultHost.length,
          player: resultPlayer.length,
          label: `${
            item.getMonth() === 0 ? 12 : item.getMonth()
          }/${item.getFullYear()}`,
        });
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getListAccountWithDate: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { dateFilter } = req.body;
      const [year, month, day] = dateFilter.split('-').map(Number);
      const result = [];
      for (let index = day < 7 ? 0 : day - 7; index < day; index++) {
        const resultHost =
          await accountService.getListAccountWithDate(
            new Date(year, month, index),
            'HOST'
          );
        const resultPlayer =
          await accountService.getListAccountWithDate(
            new Date(year, month, index),
            'USER'
          );
        result.push({
          host: resultHost.length,
          player: resultPlayer.length,
          label: `${index + 1}/${month}`,
        });
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getListAccountInMonth: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { dateFilter } = req.body;
      const [year, month] = dateFilter.split('-').map(Number);

      // Xác định số ngày trong tháng
      const daysInMonth = new Date(year, month, 0).getDate();

      const result = [];
      for (let index = 0; index < daysInMonth; index++) {
        const resultHost = await accountService.getListAccountInMonth(
          year,
          month,
          index,
          'HOST'
        );
        const resultPlayer =
          await accountService.getListAccountInMonth(
            year,
            month,
            index,
            'USER'
          );
        result.push({
          host: resultHost.length,
          player: resultPlayer.length,
          label: `${index + 1}/${month}`,
        });
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default accountController;
