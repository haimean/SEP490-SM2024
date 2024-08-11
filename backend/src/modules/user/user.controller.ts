import { NextFunction, Request, Response } from 'express';
import CustomError from '../../outcomes/customError';
import accountServiceBase from '../../baseService/accountServiceBase';
import { Account, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from './user.service';
import { ProfileUpdatePayload } from './user.model';
import { ResponseHandler } from '../../outcomes/responseHandler';
import { uploadFile } from '../../lib/upLoadImageService';

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
      const accountId = Number(req.headers.authorization);
      const account: Account = (await accountServiceBase.findById(
        accountId
      )) as Account;

      // check password
      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        account.password
      );

      if (!isPasswordValid) {
        return next(new CustomError('Sai mật khẩu', 400));
      } else {
        // hash password
        const hashPassword = await bcrypt.hash(
          newPassword,
          Number(secret)
        );

        account.password = hashPassword;

        // save new password
        await accountServiceBase.updatePass(account.id, hashPassword);

        ResponseHandler(res, 'Cập nhật mât khẩu thành công.');
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
      const accountId = Number(req.headers.authorization);
      const account: Account = (await accountServiceBase.findById(
        accountId
      )) as Account;
      ResponseHandler(res, account);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  profileUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // get information account
      const { accountId } = req.params;
      const account: Account = (await accountServiceBase.findById(
        Number(accountId)
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

      const file = req.file;
      //check file
      if (file) {
        data.image = await uploadFile(file);
      }
      // get information account
      const accountId = Number(req.headers.authorization);
      const account: User = await userService.updateProfile(
        accountId,
        data
      );

      ResponseHandler(res, account);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default userController;
