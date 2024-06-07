import { Router } from 'express';
import forgotPasswordController from './forgotPassword.controller';
import validate from '../../../utils/validate';
import forgotPasswordValidator from './forgotPassword.validator';
import forgotPasswordMiddleware from './forgotPassword.middleware';

const forgotPasswordRouter = Router();

forgotPasswordRouter.post(
  '/',
  validate(forgotPasswordValidator.findEmail),
  forgotPasswordMiddleware.findEmail,
  forgotPasswordController.findEmail
);
forgotPasswordRouter.post(
  '/verify-otp',
  validate(forgotPasswordValidator.verifyOtp),
  forgotPasswordMiddleware.findEmail,
  forgotPasswordController.verifyOtp
);
forgotPasswordRouter.post(
  '/new-pass',
  validate(forgotPasswordValidator.updatePassword),
  forgotPasswordMiddleware.findEmail,
  forgotPasswordController.updatePassword
);

export default forgotPasswordRouter;
