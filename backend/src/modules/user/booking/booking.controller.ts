import { NextFunction, Request, Response } from 'express';
import bookingUserService from './booking.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const bookingUserController = {
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const accountId = Number(req.headers.authorization);
      const result = await bookingUserService.remove(
        Number(id),
        accountId
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  // Lấy tất cả các trận đã đặt sân của user
  getAllForUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const accountId = Number(req.headers.authorization);
      const result = await bookingUserService.getAllForUser(
        accountId,
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        courtId,
        startTime,
        endTime,
        price,
        name,
        numberPhone,
      } = req.body;
      const accountId = Number(req.headers.authorization);
      // check giờ đặt có người đặt chưa
      const result = await bookingUserService.create({
        accountId,
        courtId,
        startTime,
        endTime,
        price,
        name,
        numberPhone,
      });
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
      console.log('🚀 ========= id:', id);
      const accountId = Number(req.headers.authorization);
      const result = await bookingUserService.getDetailBooking(
        Number(id),
        accountId
      );
      ResponseHandler(res, { ...result });
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingUserController;
