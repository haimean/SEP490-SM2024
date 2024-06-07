import RandExp from 'randexp';
import ejs from 'ejs';
import { Account } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import forgotPasswordService from './forgotPassword.service';
import CustomError from '../../../outcomes/customError';
import sendEmail from '../../../lib/sendEmail';
import regex from '../../../utils/regex';
import ResponseHandler from '../../../outcomes/responseHandler';
import { join } from 'path';
import { readFileSync } from 'fs';
import NotFoundError from '../../../outcomes/notFoundError';

dotenv.config();
const getEmailContent = (otp: string) => {
  const templatePath = join(
    __dirname,
    '../../../mailTemplate/sendOtp.ejs'
  );
  const template = readFileSync(templatePath, 'utf8');
  return ejs.render(template, { otp });
};
const forgotPasswordController = {
  findEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;

      const otp = new RandExp(regex.otp).gen();
      //get content mail
      const htmlContent = getEmailContent(otp);
      // send email
      await sendEmail(
        email,
        htmlContent,
        'Send OTP',
        async (err: any) => {
          if (err) {
            next(new CustomError(err, 500));
          } else {
            // save otp
            await forgotPasswordService.updateOtp(email, otp);
            ResponseHandler(res, 'Send OTP successful!');
          }
        }
      );
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  verifyOtp: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const otp: string = req.body.otp;
    const account: Account = req.body.account;
    //  check map otp
    if (otp !== account.otp) {
      next(new NotFoundError({ otp: 'OTP not match' }));
    } else {
      let date2: Date = new Date();
      if (account.otpExpired !== null) {
        date2 = account.otpExpired;
        const differenceInMilliseconds = Math.abs(
          new Date().getTime() - date2.getTime()
        );
        const twoMinutesInMilliseconds = 2 * 60 * 1000; // 2 minutes in milliseconds
        // check time 2min
        if (differenceInMilliseconds <= twoMinutesInMilliseconds) {
          await forgotPasswordService.verifyCusses(account.email);
          ResponseHandler(res, 'Verify OTP successful!');
        }
      }
      next(new CustomError('Time to check otp is over', 500));
    }
  },
  updatePassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (process.env.SECRET_JWT_KEY) {
        const { email, password } = req.body;
        const hashPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SECRET_JWT_KEY)
        );
        const account: Account =
          await forgotPasswordService.updatePassword(
            email,
            hashPassword
          );
        ResponseHandler(res, account);
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default forgotPasswordController;
