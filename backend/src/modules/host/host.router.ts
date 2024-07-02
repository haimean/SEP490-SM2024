import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';
import attributeBranchesRouter from '../admin/attributeBranches/attributeBranches.router';
import courtHostRouter from './court/court.router';

const hostRouter = Router();
hostRouter.use('/attribute-court', attributeCourtHostRouter);
hostRouter.use('/attribute-branches', attributeBranchesRouter);
hostRouter.use('/type-court', typeCourtHostRouter);
hostRouter.use('/court', courtHostRouter);

export default hostRouter;
