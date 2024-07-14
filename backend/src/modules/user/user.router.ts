import { Router } from 'express';
import userController from './user.controller';
import userValidator from './user.validator';
import validate from '../../utils/validate';
import invitationUserRouter from './invitation/invitation.router';
import bookingUserRouter from './booking/booking.router';

const userRouter = Router();
userRouter.put(
  '/change-password',
  validate(userValidator.changePassword),
  userController.changePassword
);
userRouter.get('/profile', userController.profile);
userRouter.put(
  '/profile',
  validate(userValidator.updateProfile),
  userController.updateProfile
);
userRouter.use('/invitation', invitationUserRouter);
userRouter.use('/booking', bookingUserRouter);

export default userRouter;
