import { Router } from 'express';
import validate from '../../../utils/validate';
import { upload } from '../../../lib/upload';
import blogUserValidator from './blog.validator';
import blogUserController from './blog.controller';

const blogUserRouter = Router();

blogUserRouter.post(
  '/get-all',
  validate(blogUserValidator.getAll),
  blogUserController.getAllOfUser
);
blogUserRouter.get('/:id', blogUserController.get);
blogUserRouter.get('/:id/comment', blogUserController.getComment);
blogUserRouter.get(
  '/:id/comment-newest',
  blogUserController.getCommentNew
);
blogUserRouter.put(
  '/:id',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.update
);
blogUserRouter.delete('/:id', blogUserController.delete);
blogUserRouter.post(
  '/',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.create
);

export default blogUserRouter;
