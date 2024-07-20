import { Router } from 'express';
import reviewUserValidator from './review.validator';
import reviewUserController from './review.controller';
import validate from '../../../utils/validate';

const reviewUserRouter = Router();
reviewUserRouter.post(
  '/',
  validate(reviewUserValidator.create),
  reviewUserController.create
);
reviewUserRouter.get(
  '/get-review-user/:accountId',
  reviewUserController.getReviewUser
);
reviewUserRouter.get('/get-review', reviewUserController.getReview);

reviewUserRouter;
export default reviewUserRouter;
