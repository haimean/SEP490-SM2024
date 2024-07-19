import { Router } from 'express';
import validate from '../../../utils/validate';
import postUserValidator from './post.validator';
import postUserController from './post.controller';

const postUserRouter = Router();
postUserRouter.post(
  '/',
  validate(postUserValidator.create),

  postUserController.create
);
postUserRouter.get('/:id', postUserController.get);

export default postUserRouter;
