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
      const { postId, userAvailabilityId } = req.body;
      const invitation: Invitation =
        await invitationUserService.create(
          'UNAVAILABLE',
          userAvailabilityId,
          postId
        );
      ResponseHandler(res, invitation);
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
    try {
      const { postId, userAvailabilityId } = req.body;
      const invitation: Invitation =
        await invitationUserService.create(
          'AVAILABLE',
          userAvailabilityId,
          postId
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
};

export default invitationUserController;
