import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';
import attributeBranchesHostRouter from './attributeBranches/attributeBranches.router';

const hostRouter = Router();
hostRouter.use('/attribute-court', attributeCourtHostRouter);
hostRouter.use('/attribute-branches', attributeBranchesHostRouter);
hostRouter.use('/type-court', typeCourtHostRouter);

export default hostRouter;
