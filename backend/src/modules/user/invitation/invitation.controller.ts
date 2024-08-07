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
      const invitation = await invitationUserService.createForPlayer(
        'UNAVAILABLE',
        postId,
        accountId
      );
      // thông báo cho chủ sận có người xin vào trận
      createNotifications([
        {
          id: 1,
          accountId: Number(invitation?.Post?.booking?.accountId),
          createdAt: new Date(),
          message: `Có người muốn xin vào trận đấu của bạn`,
          url: `/post/${postId}`,
          status: 'SEED',
        },
      ]);
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
      const { postId } = req.body;
      const accountId = Number(req.headers.authorization);
      const invitation: { data: Invitation[]; total: number } =
        await invitationUserService.getAvailable(postId, accountId);
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
      const accId = Number(req.headers.authorization);
      const invitation = await invitationUserService.update({
        invitationId,
        status,
        reasonCancel,
      });
      const postId = invitation.Post.id;
      // người không có sân
      if (accId === invitation.Post.booking.accountId) {
        //id người có sân
        const accountId: number =
          invitation.userAvailability.accountId;

        // tên người không có sân
        const name =
          invitation.userAvailability.account.user?.fullName;
        // id bài post
        // Thông báo
        switch (status) {
          case 'ACCEPT':
            // đã accept
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã đồng ý lời mời vào trận đấu của bạn`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            break;

          case 'NOACCEPT':
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã từ chối lời mời vào trận đấu của bạn`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            // đã accept
            break;

          case 'CANCEL':
            // đã accept
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã hủy lời mời vào trận đấu của bạn với lý do: ${reasonCancel}`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            break;

          default:
            break;
        }
      } else {
        // gửi thông báo cho người rảnh
        // account người rảnh
        const accountId: number = invitation.Post.booking.accountId;
        const name = invitation.Post.booking.account.user?.fullName;
        switch (status) {
          case 'ACCEPT':
            // đã accept
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã đồng ý lời xin vào trận đấu của bạn`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            break;

          case 'NOACCEPT':
            // đã accept
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã từ chối lời xin vào trận đấu của bạn`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            break;

          case 'CANCEL':
            // đã accept
            createNotifications([
              {
                id: 1,
                accountId,
                createdAt: new Date(),
                message: `${name} đã đồng hủy lời xin vào trận đấu của bạn với lý do: ${reasonCancel}`,
                url: `/post/${postId}`,
                status: 'SEED',
              },
            ]);
            break;

          default:
            break;
        }
      }
      ResponseHandler(res, invitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default invitationUserController;
