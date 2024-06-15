import { Router } from 'express';
import userController from './user.controller';
import userValidator from './user.validator';
import validate from '../../utils/validate';

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
export default userRouter;
