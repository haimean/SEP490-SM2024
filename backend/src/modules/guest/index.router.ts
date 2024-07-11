import { Router } from 'express';
import courtRouter from './court/court.router';
import branchesGuestRouter from './branches/branches.router';
import bookingGuestRouter from './booking/booking.router';
import postGuestRouter from './post/post.router';

const guestRouter = Router();
guestRouter.use('/court', courtRouter);
guestRouter.use('/branches', branchesGuestRouter);
guestRouter.use('/booking', bookingGuestRouter);
guestRouter.use('/post', postGuestRouter);

export default guestRouter;
