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
import NotFoundError from '../../../outcomes/notFoundError';

const getEmailComtent = (name: string, otp: string) => {
  const templatePath = join(
    __dirname,
    '../../../mailTemplate/sendOtp.ejs'
  );
  const template = readFileSync(templatePath, 'utf8');
  return ejs.render(template, {
    name,
    otp,
  });
};
const forgotPasswordMiddleware = {
  findEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      const account: Account | null =
        await forgotPasswordService.findEmail(email);
      if (account) {
        req.body.account = account;
        next();
      } else {
        next(new CustomError('Email does not exist.', 409));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default forgotPasswordMiddleware;
