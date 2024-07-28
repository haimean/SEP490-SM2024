import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import { Invitation, UserAvailability } from '@prisma/client';
import invitationUserService from './invitation.service';
import { createNotifications } from '../../../lib/notificationService';

const invitationUserController = {
  // chủ trận mời người rảnh
  requestsToTheMatch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId, userAvailabilityId } = req.body;
      const invitation: Invitation =
        await invitationUserService.create(
          'AVAILABLE',
          userAvailabilityId,
          postId
        );
      const userAvailability: UserAvailability =
        await invitationUserService.getUserAvailability(
          userAvailabilityId
        );
      createNotifications([
        {
          accountId: userAvailability.accountId,
          message: 'Có người mời bạn vào trận đấu của họ',
          status: 'SEED',
          url: '/post/' + postId,
          createdAt: new Date(),
          id: 23,
        },
      ]);
      ResponseHandler(res, invitation);
    } catch (error: any) {
      console.log(error.code);
      console.log(error.meta?.target);

      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('userAvailabilityId')
      ) {
        next(new CustomError('Trùng lời mời.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },

  // người rảnh xin vao tran
  createInvitePlayer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.body;
      const accountId = Number(req.headers.authorization);
      const invitation: Invitation =
        await invitationUserService.createForPlayer(
          'UNAVAILABLE',
          postId,
          accountId
        );
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getAllUnavailable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;
      const { pagination } = req.body;
      const invitation: { data: Invitation[]; total: number } =
        await invitationUserService.getAllUnavailable(
          Number(postId),
          pagination
        );
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getAvailableOfUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.params;
      const accountId = Number(req.headers.authorization);
      const invitation: { data: Invitation[]; total: number } =
        await invitationUserService.getAvailable(
          Number(postId),
          accountId
        );
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getUnavailableOfUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const { pagination } = req.body;
      const invitation: { data: Invitation[]; total: number } =
        await invitationUserService.getUnavailableOfUser(
          accountId,
          pagination
        );
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invitationId, status, reasonCancel } = req.body;
      const invitation = await invitationUserService.update({
        invitationId,
        status,
        reasonCancel,
      });
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default invitationUserController;
