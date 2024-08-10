import { Router } from 'express';
import userController from './user.controller';
import userValidator from './user.validator';
import validate from '../../utils/validate';
import invitationUserRouter from './invitation/invitation.router';
import bookingUserRouter from './booking/booking.router';
import userAvailableRouter from './UserAvailability/userAvailable.router';
import postUserRouter from './post/post.router';
import reviewUserRouter from './review/review.router';
import blogUserRouter from './blog/blog.router';
import commentUserRouter from './comment/comment.router';
import reportBlogUserRouter from './reportBlog/reportBlog.router';
import { upload } from '../../lib/upload';

const userRouter = Router();
userRouter.put(
  '/change-password',
  validate(userValidator.changePassword),
  userController.changePassword
);
userRouter.get('/profile', userController.profile);
userRouter.get('/profile/:accountId', userController.profileUser);
userRouter.put(
  '/profile',
  upload.single('avatar'),
  validate(userValidator.updateProfile),
  userController.updateProfile
);
userRouter.use('/invitation', invitationUserRouter);
userRouter.use('/booking', bookingUserRouter);
userRouter.use('/user-available', userAvailableRouter);
userRouter.use('/post', postUserRouter);
userRouter.use('/review', reviewUserRouter);
userRouter.use('/blog', blogUserRouter);
userRouter.use('/comment', commentUserRouter);
userRouter.use('/report-blog/', reportBlogUserRouter);

export default userRouter;
