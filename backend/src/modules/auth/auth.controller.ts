import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import authService from './auth.service';
import ResponseHandler from '../../outcomes/responseHandler';
import CustomError from '../../outcomes/customError';
import { sendMail } from '../../lib/mailer';
const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    const { loginType, email, password } = req.body;
    try {
      const newAccount = await authService.login({
        loginType: loginType ? loginType : 'Normal',
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
    const { email, password, role } = req.body;
    try {
      const newAccount = await authService.register({
        email,
        password,
        role,
      });

      const verifyUrl = `http://localhost:4200/api/auth/verify-email/${newAccount.emailToken}`;
      console.log('Verification URL:', verifyUrl);

      const htmlContent = `<a href="${verifyUrl}">Verify</a>`;
      sendMail({
        to: email,
        subject: 'Verify Email',
        htmlContent,
      })
        .then((info) => {
          console.log('Email sent successfully:', info);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
      ResponseHandler(res, newAccount);
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
      console.log('🚀 ========= emailToken:', emailToken);
      if (!emailToken) {
        next(new CustomError('Email token not found', 404));
      }
      const data = await authService.findEmail({
        emailToken,
      });
      // console.log('🚀 ========= data:', data);
      if (data) {
        ResponseHandler(res, data);
      } else {
        next(
          new CustomError(
            'Email verification failed, invalid token',
            404
          )
        );
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};
export default authController;
