import { Router } from 'express';
import blogAdminController from './blog.controller';
import validate from '../../../utils/validate';
import blogAdminValidator from './blog.validator';

const blogAdminRouter = Router();
blogAdminRouter.get('/', blogAdminController.getAll);
blogAdminRouter.get('/:id', blogAdminController.get);
blogAdminRouter.put(
  '/',
  validate(blogAdminValidator.blog),
  blogAdminController.update
);
export default blogAdminRouter;
