import { Router } from 'express';
import validate from '../../../utils/validate';
import blogUserValidator from './blog.validator';
import upload from '../../../lib/uploadImage';
import blogUserController from './blog.controller';

const blogUserRouter = Router();

blogUserRouter.get('/', blogUserController.getAllOfUser);
blogUserRouter.get(
  '/archived',
  blogUserController.getArchivedDOfUser
);
blogUserRouter.get('/:id', blogUserController.get);
blogUserRouter.put(
  '/:id',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.update
);
blogUserRouter.post(
  '/',
  upload.single('image'),
  validate(blogUserValidator.blog),
  blogUserController.create
);

export default blogUserRouter;
