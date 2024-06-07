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
forgotPasswordRouter.get('/gen-otp');
forgotPasswordRouter.post('/verify-otp');
forgotPasswordRouter.post('/new-pass');

export default forgotPasswordRouter;
