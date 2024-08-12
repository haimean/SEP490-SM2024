import { NextFunction, Request, Response } from 'express';
import bookingAdminService from './booking.service';
import dateUtils from '../../../utils/date';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const bookingAdminController = {
  getListBookingAndPost12MonthLatest: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = [];
      for (const item of dateUtils.getList12Month()) {
        const resultBooking =
          await bookingAdminService.getListBooking12MonthLatest(item);
        const resultPost =
          await bookingAdminService.getListPost12MonthLatest(item);
        result.push({
          booking: resultBooking.length,
          post: resultPost.length,
          label: `${
            item.getMonth() === 0 ? 12 : item.getMonth()
          }/${item.getFullYear()}`,
        });
        //  TODO:   - truyền ngày vào
        //  TODO:   - lấy mùng 1 tháng này và 1 tháng sau
        //  TODO:   - lấy được số lượng host và player {host: 123, player:123,month: }
        // TODO: push return vào result
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getListBookingInMonth: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await bookingAdminService.getListBookingInMonth();
      ResponseHandler(res, {
        dataInMonth: result.result.length,
        percentage:
          result.resultPreviousMonth.length == 0 ||
          result.resultPreviousMonth == null
            ? 0
            : result.result.length /
                result.resultPreviousMonth.length -
              1,
      });
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingAdminController;
