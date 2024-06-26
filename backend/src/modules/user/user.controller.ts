import { NextFunction, Request, Response } from 'express';
import CustomError from '../../outcomes/customError';
import accountServiceBase from '../../baseService/accountServiceBase';
import { Account, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from './user.service';
import { ProfileUpdatePayload } from './user.model';
import { ResponseHandler } from '../../outcomes/responseHandler';

const secret: string = process.env.SECRET_JWT_KEY ?? '';

const userController = {
  changePassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { oldPassword, newPassword } = req.body;
      // get information account
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      const account: Account = (await accountServiceBase.findById(
        jwtObj.data.id
      )) as Account;

      // check password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        account.password
      );

      if (!isPasswordValid) {
        return next(new CustomError('Password not correct', 500));
      } else {
        // hash password
        const hashPassword = await bcrypt.hash(
          newPassword,
          Number(secret)
        );

        account.password = hashPassword;

        // save new password
        await accountServiceBase.update(account.id, account);

        ResponseHandler(res, 'Update Password successful.');
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  profile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // get information account
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      const account: Account = (await accountServiceBase.findById(
        jwtObj.data.id
      )) as Account;
      ResponseHandler(res, account);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  updateProfile: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: ProfileUpdatePayload = req.body;
      // get information account
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      const account: User = await userService.updateProfile(
        jwtObj.data.id,
        data
      );

      ResponseHandler(res, account);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default userController;
