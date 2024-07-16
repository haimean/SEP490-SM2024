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
  validate(invitationUserValidator.create),
  invitationUserController.createInvitePlayer
);
export default invitationUserRouter;
