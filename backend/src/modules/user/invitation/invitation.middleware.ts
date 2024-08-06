import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import invitationUserService from './invitation.service';
import { UserAvailability } from '@prisma/client';

const invitationUserMiddleware = {
  requestsToTheMatch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId, userAvailabilityId } = req.body;
      const userAvailability: UserAvailability =
        await invitationUserService.getUserAvailability(
          userAvailabilityId
        );
      const invitation = await invitationUserService.getInvitation(
        userAvailability.accountId,
        Number(postId)
      );
      if (invitation.length > 0) {
        const error =
          invitation[0].type === 'AVAILABLE'
            ? 'Bạn đã gửi lời mời cho người dùng'
            : 'Người dùng đã gửi lời mời tới trận đấu của bạn';
        next(new CustomError(error, 400));
      } else {
        next();
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  createInvitePlayer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { postId } = req.body;
      const accountId = Number(req.headers.authorization);
      const invitation = await invitationUserService.getInvitation(
        accountId,
        Number(postId)
      );
      if (invitation.length > 0) {
        const error =
          invitation[0].type === 'AVAILABLE'
            ? 'Chủ trận đấu đã gửi lời mời cho bạn'
            : 'Bạn đã xin vào trận trước đó';
        next(new CustomError(error, 400));
      } else {
        next();
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default invitationUserMiddleware;
