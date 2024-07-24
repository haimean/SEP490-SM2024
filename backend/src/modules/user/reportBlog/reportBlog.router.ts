import { Router } from 'express';
import validate from '../../../utils/validate';
import reportBlogUserValidator from './reportBlog.validator';
import reportBlogUserController from './reportBlog.controller';

const reportBlogUserRouter = Router();
reportBlogUserRouter.post(
  '/:blogId/',

  validate(reportBlogUserValidator.create),
  reportBlogUserController.create
);
export default reportBlogUserRouter;
