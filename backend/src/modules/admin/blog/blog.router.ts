import { Router } from 'express';
import validate from '../../../utils/validate';
import blogAdminValidator from './blog.validator';
import blogAdminController from './blog.controller';

const blogAdminRouter = Router();
blogAdminRouter.post(
  '/report',
  validate(blogAdminValidator.getAllReport),
  blogAdminController.getAllReport
);
blogAdminRouter.post(
  '/report-ban/:id',
  blogAdminController.banReport
);
blogAdminRouter.delete('/report/:id', blogAdminController.delete);

export default blogAdminRouter;
