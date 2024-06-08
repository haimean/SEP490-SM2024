import { Router } from 'express';
import attributeKeyBranchesRouter from './attributeKeyBranches/attributeKeyBranches.router';

const attributeBranchesRouter = Router();

attributeBranchesRouter.use('/key', attributeKeyBranchesRouter);

export default attributeBranchesRouter;
