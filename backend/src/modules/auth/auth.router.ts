import { Router } from 'express';
import forgotPasswordRouter from './forgotPassword/forgotPassword.router';

const authRouter = Router();

authRouter.use('/forgot-password', forgotPasswordRouter);

export default authRouter;
