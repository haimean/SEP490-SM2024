import { Router } from 'express';
import validate from '../../../utils/validate';
import blogUserValidator from './blog.validator';
import upload from '../../../lib/uploadImage';
import blogUserController from './blog.controller';

const blogUserRouter = Router();

blogUserRouter.post(
  '/get-all',
  validate(blogUserValidator.getAll),
  blogUserController.getAllOfUser
);
blogUserRouter.get('/:id', blogUserController.get);
blogUserRouter.put(
  '/:id',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.update
);
// blogUserRouter.delete('/:id', blogUserController.delete);
blogUserRouter.post(
  '/',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.create
);

export default blogUserRouter;
