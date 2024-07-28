import { Router } from 'express';
import validate from '../../../utils/validate';
import invitationUserValidator from './invitation.validator';
import invitationUserController from './invitation.controller';

const invitationUserRouter = Router();

invitationUserRouter.post(
  '/requests-to-match',
  validate(invitationUserValidator.create),
  invitationUserController.requestsToTheMatch
);

invitationUserRouter.post(
  '/invite',
  validate(invitationUserValidator.createInvitePlayer),
  invitationUserController.createInvitePlayer
);

invitationUserRouter.post(
  '/unavailable/:postId',
  validate(invitationUserValidator.getAllUnavailable),
  invitationUserController.getAllUnavailable
);

invitationUserRouter.post(
  '/unavailable-of-user',
  validate(invitationUserValidator.getUnavailableOfUser),
  invitationUserController.getUnavailableOfUser
);

invitationUserRouter.post(
  '/available-of-user',
  validate(invitationUserValidator.getAvailableOfUser),
  invitationUserController.getAvailableOfUser
);

invitationUserRouter.post(
  '/update',
  validate(invitationUserValidator.update),
  invitationUserController.update
);

export default invitationUserRouter;
