import { Router } from 'express';
import validate from '../../../utils/validate';
import blogHostValidator from './blog.validator';
import upload from '../../../lib/uploadImage';
import blogHostController from './blog.controller';

const blogHostRouter = Router();

blogHostRouter.get('/', blogHostController.getAllOfUser);
blogHostRouter.get(
  '/archived',
  blogHostController.getArchivedDOfUser
);
blogHostRouter.get('/:id', blogHostController.get);
blogHostRouter.put(
  '/:id',
  upload.single('image'),
  validate(blogHostValidator.blog),
  blogHostController.update
);
blogHostRouter.post(
  '/',
  upload.single('image'),
  validate(blogHostValidator.blog),
  blogHostController.create
);

export default blogHostRouter;
