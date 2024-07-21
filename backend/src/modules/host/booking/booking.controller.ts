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
  getDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const accountId = Number(req.headers.authorization);
      const result = await bookingHostService.getDetailBooking(
        Number(id),
        accountId
      );
      ResponseHandler(res, { ...result });
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
      const { branchesId, pagination, sort } = req.body;
      console.log(sort);

      const result = await bookingHostService.getBookingHostList(
        branchesId,
        Number(req.headers.authorization),
        pagination,
        sort
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getBookingHostByBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { branchesId, pagination } = req.body;
      const result = await bookingHostService.getBookingHostByBranch(
        branchesId,
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  cancel: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId, reasonCancell } = req.body;
      const result = await bookingHostService.cancel(
        bookingId,
        reasonCancell
      );

      //TODO: gửi mail và thông báo 1
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingHostController;
