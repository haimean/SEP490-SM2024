import RandExp from 'randexp';
import { Account } from '@prisma/client';
import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import forgotPasswordService from './forgotPassword.service';
import CustomError from '../../../outcomes/customError';
import sendEmail from '../../../lib/sendEmail';
import regex from '../../../utils/regex';
import ResponseHandler from '../../../outcomes/responseHandler';
import { join } from 'path';
import { readFileSync } from 'fs';

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
};
export default forgotPasswordController;
