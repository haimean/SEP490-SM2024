import { Router } from 'express';
import authController from './auth.controller';
import forgotPasswordRouter from './forgotPassword/forgotPassword.router';
import validate from '../../utils/validate';
import authValidator from './auth.validator';

const authRouter = Router();
authRouter.post(
  '/login',
  validate(authValidator.login),
  authController.login
);
authRouter.post('/register', authController.register);
authRouter.post('/loginGoogle', authController.loginGoogle);
authRouter.use('/forgot-password', forgotPasswordRouter);

authRouter.get(
  '/verify-email/:emailToken',
  authController.verifyEmail
);
export default authRouter;
