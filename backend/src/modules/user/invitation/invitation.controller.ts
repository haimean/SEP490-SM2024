import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import { Invitation, Post } from '@prisma/client';
import invitationUserService from './invitation.service';
import NotFoundError from '../../../outcomes/notFoundError';

const invitationUserController = {
  requestsToTheMatch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const { postId } = req.body;
      const post: Post | null = await invitationUserService.getPost(
        postId
      );
      if (post?.accountId) {
        if (
          await invitationUserService.getRequestsToTheMatch(
            accountId,
            postId
          )
        ) {
          const invitation: Invitation =
            await invitationUserService.createRequestsToTheMatch(
              accountId,
              post?.accountId,
              postId
            );
          ResponseHandler(res, invitation);
        } else {
          next(new NotFoundError('Bạn đã đăng ký giao lưu'));
        }
      } else {
        next(new NotFoundError('Không tìm thấy bài giao lưu'));
      }
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên cơ sở đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  createInvitePlayer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { idCreate, idInvite, postId } = req.body;
    try {
      const result = await invitationUserService.createInvitePlayer(
        idCreate,
        idInvite,
        postId
      );
      console.log('🚀 ========= result:', result);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default invitationUserController;
