import { Router } from 'express';
import bookingHostController from './booking.controller';

const bookingHostRouter = Router();
bookingHostRouter.post('/', bookingHostController.getBookingList);
bookingHostRouter.post(
  '/history',
  bookingHostController.getBookingHostList
);
export default bookingHostRouter;
