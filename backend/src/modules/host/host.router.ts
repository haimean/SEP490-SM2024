import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import branchesHostRouter from './branches/branches.router';
import courtHostRouter from './court/court.router';
import attributeBranchesHostRouter from './attributeBranches/attributeBranches.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';
import blogHostRouter from './blog/blog.router';
import bookCourtHostRouter from './bookCourt/bookCourt.router';
import bookingHostRouter from './booking/booking.router';

const hostRouter = Router();
hostRouter.use('/attribute-court', attributeCourtHostRouter);
hostRouter.use('/attribute-branches', attributeBranchesHostRouter);
hostRouter.use('/type-court', typeCourtHostRouter);
hostRouter.use('/branches', branchesHostRouter);
hostRouter.use('/court', courtHostRouter);
hostRouter.use('/blog', blogHostRouter);
hostRouter.use('/booking', bookCourtHostRouter);
hostRouter.use('/history-booking', bookingHostRouter);

export default hostRouter;
