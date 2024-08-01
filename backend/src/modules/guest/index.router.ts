import { Router } from 'express';
import courtRouter from './court/court.router';
import branchesGuestRouter from './branches/branches.router';
import bookingGuestRouter from './booking/booking.router';
import blogGuestRouter from './blog/blog.router';
import reviewGuestRouter from './review/review.router';
import postRouter from './post/post.router';

const guestRouter = Router();
guestRouter.use('/court', courtRouter);
guestRouter.use('/branches', branchesGuestRouter);
guestRouter.use('/booking', bookingGuestRouter);
guestRouter.use('/blog', blogGuestRouter);
guestRouter.use('/review', reviewGuestRouter);
guestRouter.use('/post', postRouter);

export default guestRouter;
