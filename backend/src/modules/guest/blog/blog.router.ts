import { Router } from 'express';
import blogGuestController from './blog.controller';

const blogGuestRouter = Router();
blogGuestRouter.get('/', blogGuestController.getAll);
blogGuestRouter.get('/:id', blogGuestController.get);
export default blogGuestRouter;
