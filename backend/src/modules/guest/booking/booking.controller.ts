import { Account, Booking } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import bookingGuestService from './booking.service';

const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
const bookingGuestController = {
  getBookingPost: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any = [];
      if (req.headers?.authorization) {
        const token = req.headers?.authorization?.split(' ')[1] ?? '';
        const jwtObj: { data: Account } = jwt.verify(
          token,
          secret
        ) as {
          data: Account;
        };
        const accountId = jwtObj.data.id;
        if (accountId) {
          const data = await bookingGuestService.getBookingPostLogin(
            accountId
          );
          for (const element of data) {
            // remove full-person posts
            const numberMember: number = element.post
              ?.numberMember as number;
            const numberInvitation: number = element?.post?.invitation
              ? element?.post?.invitation.length
              : 0;
            const invitation =
              await bookingGuestService.getInvitation(
                accountId,
                element?.post?.id as number
              );
            // Don't filter posts that have invitations
            if (
              numberMember > numberInvitation &&
              invitation.length === 0
            ) {
              result.push(element);
            }
          }
        }
      } else {
        result = await bookingGuestService.getBookingPost();
      }
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookingGuestController;
