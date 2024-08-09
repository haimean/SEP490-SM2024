import { NextFunction, Request, Response } from 'express';
import bookingHostService from './booking.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { createNotifications } from '../../../lib/notificationService';

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
      // Check if you have booked before
      const result = await bookingHostService.create({
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

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startTime, endTime, price, name, numberPhone } =
        req.body;
      const { id } = req.params;
      // check giờ đặt có người đặt chưa
      const result = await bookingHostService.update({
        id: Number(id),
        startTime,
        endTime,
        price,
        name,
        numberPhone,
      });
      // thông báo mail và realtime cho user
      createNotifications([
        {
          id: 1,
          accountId: result.accountId,
          createdAt: new Date(),
          message: `Chủ sân ${result.Court.Branches?.name} đã thay đổi thông tin ca đặt của bạn`,
          url: `/player/booking-history/${id}`,
          status: 'SEED',
        },
      ]);

      ResponseHandler(res, result);
    } catch (error: any) {
      console.log(error);

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
      const result = await bookingHostService.getDetailBooking(
        Number(id)
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
      // Notify users who have agreed to the match
      const invitations = result?.post?.invitation;
      if (invitations) {
        for (const invitation of invitations) {
          createNotifications([
            {
              id: 1,
              accountId: invitation.userAvailability.accountId,
              createdAt: new Date(),
              message: `Chủ sân ${result.Court.Branches?.name} đã hủy lịch với lý do: ${reasonCancell}`,
              url: `/#`,
              status: 'SEED',
            },
          ]);
        }
      }
      // thông báo hủy hủy booking của host -> thông báo + mail cho người chơi, trường hợp có người xin
      createNotifications([
        {
          id: 1,
          accountId: result.accountId,
          createdAt: new Date(),
          message: `Chủ sân ${result.Court.Branches?.name} đã hủy lịch của bạn với lý do: ${reasonCancell}`,
          url: `/#`,
          status: 'SEED',
        },
      ]);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getAForWeek: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { date } = req.body;
      const { courtId } = req.params;
      const accountId = Number(req.headers.authorization);
      const result = await bookingHostService.getAForWeek(
        accountId,
        date,
        Number(courtId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingHostController;
