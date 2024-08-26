import { NextFunction, Request, Response } from 'express';

import { createNotifications } from '../../../lib/notificationService';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import bookingUserService from './booking.service';

const bookingUserController = {
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const accountId = Number(req.headers.authorization);
      const result = await bookingUserService.remove(
        Number(id),
        accountId
      );

      // thông báo người chơi hủy trận
      createNotifications([
        {
          id: 1,
          accountId: Number(result?.Court?.Branches?.accountId),
          createdAt: new Date(),
          message: `Người chơi đã hủy sân ${result?.Court?.Branches?.name} của bạn`,
          url: `/#`,
          status: 'SEED',
        },
      ]);
      const invitations = result?.post?.invitation;
      if (invitations) {
        for (const invitation of invitations) {
          createNotifications([
            {
              id: 1,
              accountId: invitation.userAvailability.accountId,
              createdAt: new Date(),
              message: `Người chơi đã hủy sân ${result.Court.Branches?.name}`,
              url: `/#`,
              status: 'SEED',
            },
          ]);
        }
      }
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
      const { data } = req.body;
      const accountId = Number(req.headers.authorization);
      let status = true;
      for (const element of data) {
        const { courtId, startTime, endTime } = element;
        if (
          // Check the yard time
          await bookingUserService.checkBookingConflict(
            accountId,
            startTime,
            endTime,
            courtId
          )
        ) {
          status = false;
          break;
        }
      }
      if (status) {
        for (const element of data) {
          const {
            courtId,
            startTime,
            endTime,
            price,
            name,
            numberPhone,
          } = element;
          const booking = await bookingUserService.create({
            accountId,
            courtId,
            startTime,
            endTime,
            price,
            name,
            numberPhone,
          });
          // Thông báo thành công cho host booking thành công _> thông báo về host
          // get court
          const court = await bookingUserService.getCourt(courtId);
          createNotifications([
            {
              id: 1,
              accountId: Number(court?.Branches?.accountId),
              createdAt: new Date(),
              message: `Người chơi đã đăng ký trận của bạn`,
              url: `/host/booking-history/detail/${booking.id}`,
              status: 'SEED',
            },
          ]);
        }
        ResponseHandler(res, 'success');
      } else {
        next(new CustomError('Bạn đã tham gia ở trận đấu', 400));
      }
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
