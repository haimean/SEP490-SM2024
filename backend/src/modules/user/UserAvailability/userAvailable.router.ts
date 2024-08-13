import { Router } from 'express';
import userAvailableController from './userAvailability.controller';
import validate from '../../../utils/validate';
import userAvailableValidator from './userAvailable.validator';

const userAvailableRouter = Router();
userAvailableRouter.post('/', userAvailableController.listAvailable);

// những người khả dụng có thể tham gia trânj đấu
userAvailableRouter.post(
  '/:postId/get-user-free',
  userAvailableController.getUserFree
);

userAvailableRouter.post(
  '/:postId/get-user-match',
  userAvailableController.getUserMatch
);

userAvailableRouter.post(
  '/:postId/get-user-accept',
  userAvailableController.getUserAccept
);
userAvailableRouter.post(
  '/request-list-join',
  validate(userAvailableValidator.getRequestListJoin),
  userAvailableController.getRequestListJoin
);
export default userAvailableRouter;
