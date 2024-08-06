import { Router } from 'express';
import postController from './post.controller';

const postRouter = Router();
postRouter.get('/top-3', postController.getTopThree);
postRouter.get('/:id', postController.get);

export default postRouter;
