import { NextFunction, Request, Response } from 'express';

import { Invitation, UserAvailability } from '@prisma/client';

import { createNotifications } from '../../../lib/notificationService';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import invitationUserService from './invitation.service';

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
          message: `Có người xin tham gia vào trận đấu của bạn`,
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
      const accountId = Number(req.headers.authorization);
      // check nếu status bằng accpet
      if (status === 'ACCEPT') {
        const invitation =
          await invitationUserService.getInvitationById(invitationId);
        const accountIdInvitation = invitation?.userAvailability
          .accountId as number;
        const startTime = invitation?.Post.booking.startTime as Date;
        const endTime = invitation?.Post.booking.endTime as Date;
        if (
          await invitationUserService.checkBookingConflict(
            accountIdInvitation,
            startTime,
            endTime
          )
        ) {
          if (accountId === accountIdInvitation) {
            next(
              new CustomError('Bạn đã chơi ở 1 trận đấu khác', 500)
            );
          } else {
            next(
              new CustomError(
                'Người bạn mời đã chơi ở 1 trận đấu khác',
                500
              )
            );
          }
        } else {
          const invitation = await invitationUserService.update({
            invitationId,
            status,
            reasonCancel,
          });
          const postId = invitation.Post.id;
          // people without anger
          if (accountId === invitation.Post.booking.accountId) {
            //person id has yard
            const accountId: number =
              invitation.userAvailability.accountId;
            // name of person without anger
            const name = invitation.Post.booking?.bookingInfo?.name;
            // Notification
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
                break;

              case 'CANCEL':
                // accepted
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
            // send notification to free person
            // account of free person
            const accountId: number =
              invitation.Post.booking.accountId;
            const name =
              invitation.userAvailability.account.user?.fullName;
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
        }
      } else {
        const invitation = await invitationUserService.update({
          invitationId,
          status,
          reasonCancel,
        });
        const postId = invitation.Post.id;
        // people without anger
        if (accountId === invitation.Post.booking.accountId) {
          //person id has yard
          const accountId: number =
            invitation.userAvailability.accountId;
          // name of person without anger
          const name = invitation.Post.booking?.bookingInfo?.name;
          // Notification
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
              break;

            case 'CANCEL':
              // accepted
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
          // send notification to free person
          // account of free person
          const accountId: number = invitation.Post.booking.accountId;
          const name =
            invitation.userAvailability.account.user?.fullName;
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
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default invitationUserController;
