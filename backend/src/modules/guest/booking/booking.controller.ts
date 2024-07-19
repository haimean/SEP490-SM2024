import { Account } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import bookingGuestService from './booking.service';

const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
const bookingGuestController = {
  getBookingPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      let result: any = [];
      if (jwtObj.data.id) {
        result = await bookingGuestService.getBookingPostLogin(
          jwtObj.data.id
        );
      } else {
        result = await bookingGuestService.getBookingPost();
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingGuestController;
