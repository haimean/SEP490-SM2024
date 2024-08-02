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
  // todo: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const result = [];

  //     //  - lấy được tháng hiện tại new Date
  //     const monhth = new Date().getDate();
  //     const year = new Date().getFullYear();
  //     // - lấy được 1 mảng 12 tháng gần nhất
  //     const listMonth = [];
  //     const listMonthPrevious = [];
  //     for (let index = 1; index <= 12; index++) {
  //       if (index > monhth) {
  //         listMonthPrevious.push(new Date(year - 1, index, 1));
  //       } else {
  //         listMonth.push(new Date(year, index, 1));
  //       }
  //     }
  //     // sắp xếp lại mảng trên theo cái kia
  //     const list = [...listMonthPrevious, ...listMonth];

  //     //  TODO: - vòng lặp đẻ lấy số lượng user và host trong 1 tháng
  //     for (const item of list) {
  //      //  TODO:   - truyền ngày vào
  //      //  TODO:   - lấy mùng 1 tháng này và 1 tháng sau
  //      //  TODO:   - lấy được số lượng host và player {host: 123, player:123,month: }
  //      // TODO: push return vào result
  //     }
  //     ResponseHandler(res, result);
  //   } catch (error: any) {
  //     next(new CustomError(error?.message, 500));
  //   }
  // },
};

export default accountController;
