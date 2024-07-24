import { Router } from 'express';
import validate from '../../../utils/validate';
import commentUserValidator from './comment.validator';
import commentUserController from './comment.controller';

const commentUserRouter = Router();
commentUserRouter.post(
  '/',

  validate(commentUserValidator.create),
  commentUserController.create
);

export default commentUserRouter;
