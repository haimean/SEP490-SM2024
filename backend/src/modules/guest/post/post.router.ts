import { Router } from 'express';
import postGuestController from './post.controller';

const postGuestRouter = Router();

postGuestRouter.get('/:id', postGuestController.get);
export default postGuestRouter;
