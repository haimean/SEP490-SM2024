import { Router } from 'express';
import branchController from './branch.controller';

const branchRouter = Router();
branchRouter.get('/', branchController.listBranch);
export default branchRouter;
