import { Router } from 'express';
import courtRouter from './court/court.router';
import branchesGuestRouter from './branches/branches.router';

const guestRouter = Router();
guestRouter.use('/court', courtRouter);
guestRouter.use('/court', branchesGuestRouter);

export default guestRouter;
