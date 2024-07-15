import { Router } from 'express';
import branchUserController from './branch.controller';

const branchUserRouter = Router();
branchUserRouter.get('/', branchUserController.listBranch);
export default branchUserRouter;
