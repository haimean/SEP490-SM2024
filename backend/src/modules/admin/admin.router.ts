import { Router } from 'express';
import attributeCourtRouter from './attributeCourt/attributeCourt.router';
import attributeBranchesRouter from './attributeBranches/attributeBranches.router';
import accountRouter from './account/account.router';

const adminRouter = Router();
adminRouter.use('/attribute-court', attributeCourtRouter);
adminRouter.use('/attribute-branches', attributeBranchesRouter);
adminRouter.use('/account', accountRouter);

export default adminRouter;
