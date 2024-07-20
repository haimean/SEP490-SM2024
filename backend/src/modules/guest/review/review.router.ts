import { Router } from 'express';
import reviewGuestController from './review.controller';

const reviewGuestRouter = Router();
reviewGuestRouter.get(
  '/rating/:accountId',
  reviewGuestController.getRating
);
export default reviewGuestRouter;
