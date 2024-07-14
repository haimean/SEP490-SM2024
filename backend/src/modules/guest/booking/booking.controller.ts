import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import bookingGuestService from './booking.service';

const bookingGuestController = {
  getBookingPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await bookingGuestService.getBookingPost();
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingGuestController;
