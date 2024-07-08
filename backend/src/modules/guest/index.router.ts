import { Router } from 'express';
import courtRouter from './court.router';

const guestRouter = Router();
guestRouter.use('/court', courtRouter);
export default guestRouter;
