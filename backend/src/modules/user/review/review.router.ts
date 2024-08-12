import { Router } from 'express';
import reviewUserValidator from './review.validator';
import reviewUserController from './review.controller';
import validate from '../../../utils/validate';

const reviewUserRouter = Router();

//tạo hoặc update review
reviewUserRouter.post(
  '/',
  validate(reviewUserValidator.create),
  reviewUserController.create
);
//lấy tất cả review của người dùng nào đó
reviewUserRouter.get(
  '/get-all-review/:accountId',
  reviewUserController.getAllReviewUser
);

// get tất cả review của chính mình
reviewUserRouter.get(
  '/get-all-review',
  reviewUserController.getReview
);

// get review của user và người khác
reviewUserRouter.get(
  '/get-review/:accountRecipientId',
  reviewUserController.getReviewUser
);
reviewUserRouter;
export default reviewUserRouter;
