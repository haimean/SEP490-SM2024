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

reviewUserRouter;
export default reviewUserRouter;
