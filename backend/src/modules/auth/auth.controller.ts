import { NextFunction, Request, Response } from 'express';
import authService from './auth.service';
import ResponseHandler from '../../outcomes/responseHandler';
import CustomError from '../../outcomes/customError';
import sendEmail from '../../lib/sendEmail';
import NotFoundError from '../../outcomes/notFoundError';
import { readFileSync } from 'fs';
import { join } from 'path';
import ejs from 'ejs';

const getEmailContent = (link: string) => {
  const templatePath = join(
    __dirname,
    '../../mailTemplate/sendVerify.ejs'
  );
  const template = readFileSync(templatePath, 'utf8');
  return ejs.render(template, { link });
};

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const newAccount = await authService.login({
        email,
        password,
      });
      ResponseHandler(res, newAccount);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password, role, name } = req.body;
    try {
      const newAccount = await authService.register({
        email,
        password,
        role,
        name,
      });
      const verifyUrl = `${
        req.protocol + '://' + req.get('host')
      }/api/auth/verify-email/${newAccount.emailToken}`;
      const htmlContent = getEmailContent(verifyUrl);
      await sendEmail(
        email,
        htmlContent,
        'Verify Email',
        async (err: any) => {
          if (err) {
            next(new CustomError(err, 500));
          } else {
            ResponseHandler(res, newAccount);
          }
        }
      );
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  verifyEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const emailToken = req.params.emailToken;

      if (!emailToken) {
        next(new NotFoundError('Email token not found'));
      }
      await authService.findEmail(emailToken);
      res.redirect((process.env.FONT_END_URL as string) + '/login');
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  loginGoogle: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, role, name } = req.body;
    try {
      const newAccount = await authService.loginGoogle({
        email,
        role,
        name,
      });
      ResponseHandler(res, newAccount);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default authController;
