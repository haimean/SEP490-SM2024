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
        const invitation: Invitation =
          await invitationUserService.createRequestsToTheMatch(
            accountId,
            post?.accountId,
            postId
          );
        ResponseHandler(res, invitation);
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
};

export default invitationUserController;
