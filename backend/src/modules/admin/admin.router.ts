import { Router } from 'express';
import attributeCourtRouter from './attributeCourt/attributeCourt.router';
import attributeBranchesRouter from './attributeBranches/attributeBranches.router';

const adminRouter = Router();
adminRouter.use('/attribute-court', attributeCourtRouter);
adminRouter.use('/attribute-branches', attributeBranchesRouter);

export default adminRouter;
