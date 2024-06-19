import { Router } from 'express';
import branchRouter from './branch/branch.router';

const hostRouter = Router();
hostRouter.use('/attribute-key-branches', branchRouter);
export default hostRouter;
