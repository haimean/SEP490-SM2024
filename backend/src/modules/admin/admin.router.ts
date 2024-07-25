import { Router } from 'express';
import attributeCourtRouter from './attributeCourt/attributeCourt.router';
import attributeBranchesRouter from './attributeBranches/attributeBranches.router';
import accountRouter from './account/account.router';
import branchesAdminRouter from './branches/branches.router';
import blogAdminRouter from './blog/blog.router';

const adminRouter = Router();
adminRouter.use('/attribute-court', attributeCourtRouter);
adminRouter.use('/attribute-branches', attributeBranchesRouter);
adminRouter.use('/account', accountRouter);
adminRouter.use('/branches', branchesAdminRouter);
adminRouter.use('/blog', blogAdminRouter);

export default adminRouter;
