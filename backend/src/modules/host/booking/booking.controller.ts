import { NextFunction, Request, Response } from 'express';
import bookingHostService from './booking.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const bookingHostController = {
  getBookingList: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountId, pagination } = req.body;
      const result = await bookingHostService.getBookingList(
        accountId,
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getBookingHostList: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const result = await bookingHostService.getBookingHostList(
        Number(req.headers.authorization),
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingHostController;
