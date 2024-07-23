import { Router } from 'express';
import blogGuestController from './blog.controller';
import validate from '../../../utils/validate';
import blogGuestValidator from './blog.validator';

const blogGuestRouter = Router();
blogGuestRouter.get(
  '/',
  validate(blogGuestValidator.getAll),
  blogGuestController.getAllOfUser
);
blogGuestRouter.get('/:id', blogGuestController.get);
export default blogGuestRouter;
