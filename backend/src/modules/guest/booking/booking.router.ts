import { Router } from 'express';
import bookingGuestController from './booking.controller';

const bookingGuestRouter = Router();
bookingGuestRouter.get(
  '/get-booking-post',
  bookingGuestController.getBookingPost
);
bookingGuestRouter.get(
  '/get-all-for-user/',
  bookingGuestController.getAllForUser
);
export default bookingGuestRouter;
