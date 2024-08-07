import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import branchesHostRouter from './branches/branches.router';
import courtHostRouter from './court/court.router';
import attributeBranchesHostRouter from './attributeBranches/attributeBranches.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';
import bookCourtHostRouter from './bookCourt/bookCourt.router';
import bookingHostRouter from './booking/booking.router';
import statsRouter from './stats/stats.router';
import attributeKeyCourtHostRouter from './attributeKeyCourt/attributeKeyCourt.router';

const hostRouter = Router();
hostRouter.use('/attribute-court', attributeCourtHostRouter);
hostRouter.use('/attribute-branches', attributeBranchesHostRouter);
hostRouter.use('/type-court', typeCourtHostRouter);
hostRouter.use('/branches', branchesHostRouter);
hostRouter.use('/court', courtHostRouter);
hostRouter.use('/booking', bookCourtHostRouter);
hostRouter.use('/history-booking', bookingHostRouter);
hostRouter.use('/stats', statsRouter);
hostRouter.use('/attribute-key-court', attributeKeyCourtHostRouter);

export default hostRouter;
