import { Router } from 'express';
import bookingHostController from './booking.controller';

const bookingHostRouter = Router();
bookingHostRouter.post('/', bookingHostController.getBookingList);
bookingHostRouter.post(
  '/history',
  bookingHostController.getBookingHostList
);
bookingHostRouter.post(
  '/booking-list',
  bookingHostController.getBookingHostByBranch
);
export default bookingHostRouter;
