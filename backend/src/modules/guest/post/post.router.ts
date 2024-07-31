import { Router } from 'express';
import postController from './post.controller';

const postRouter = Router();
postRouter.get('/:id', postController.get);

export default postRouter;
