import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import userAvailableService from './userAvailable.service';
import { Level, UserAvailability } from '@prisma/client';
const removeDuplicatesUsingSet = (
  arr: UserAvailability[]
): UserAvailability[] => {
  const seen = new Set<number>();
  return arr.filter((item) => {
    if (seen.has(item.accountId)) {
      return false;
    } else {
      seen.add(item.accountId);
      return true;
    }
  });
};
const userAvailableController = {
  listAvailable: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { startTime, endTime, provinces, districts } = req.body;
    try {
      const result = await userAvailableService.listAvailable(
        startTime,
        endTime,
        provinces,
        districts
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getUserFree: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      // Get info post
      const post = await userAvailableService.getPost(Number(postId));
      // Get userAvailable with same level, districts, provinces and same day
      const userVariables =
        await userAvailableService.getUserAvailableSamePost({
          provinces: post?.booking.Court.Branches?.address
            ?.provinces as string,
          districts: post?.booking.Court.Branches?.address
            ?.districts as string,
          date: post?.booking.startTime as Date,
        });
      // filter userAvailability, if there is duplicate accountId, remove it
      const uniqueUserVariablesUsingSet =
        removeDuplicatesUsingSet(userVariables);
      // Check userAvailable already has time to play (booking or invitation accepted). If so, remove

      const userVariablesNotAccInvitation = [];
      for (const userVariable of uniqueUserVariablesUsingSet) {
        // get invitations with accountId and post
        const invitation = await userAvailableService.getInvitation(
          userVariable.accountId,
          Number(postId)
        );

        // Check during this time period, if the player has any matches at the same time, if they are invited or booked
        // Find if accountId's booking has the same posting time
        const bookingFinByTime =
          await userAvailableService.getBookingFindByTime(
            userVariable.accountId,
            post?.booking.startTime as Date,
            post?.booking.endTime as Date
          );
        // Search invitation status accpect
        const invitationFinByTime =
          await userAvailableService.getInvitationFindByTime(
            userVariable.accountId,
            post?.booking.startTime as Date,
            post?.booking.endTime as Date
          );
        // If not, push to userVariablesNotAccInvitation
        if (
          invitation.length === 0 &&
          bookingFinByTime.length === 0 &&
          invitationFinByTime.length === 0
        ) {
          userVariablesNotAccInvitation.push(userVariable);
        }
      }

      ResponseHandler(res, userVariablesNotAccInvitation);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getUserMatch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      const result = await userAvailableService.getUserMatch(
        Number(postId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getUserAccept: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { postId } = req.params;
    try {
      const result = await userAvailableService.getUserAccept(
        Number(postId)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getRequestListJoin: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const { status } = req.body;

      const requestList =
        await userAvailableService.getRequestListJoin(
          accountId,
          status
        );
      ResponseHandler(res, requestList);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default userAvailableController;
