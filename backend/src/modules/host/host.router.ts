import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import branchesHostRouter from './branches/branches.router';
import courtHostRouter from './court/court.router';
import attributeBranchesHostRouter from './attributeBranches/attributeBranches.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';

const hostRouter = Router();
hostRouter.use('/attribute-court', attributeCourtHostRouter);
hostRouter.use('/attribute-branches', attributeBranchesHostRouter);
hostRouter.use('/type-court', typeCourtHostRouter);
hostRouter.use('/branches', branchesHostRouter);
hostRouter.use('/court', courtHostRouter);

export default hostRouter;
