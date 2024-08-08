import { Router } from 'express';
import bookingAdminController from './booking.controller';

const bookingAdminRouter = Router();
bookingAdminRouter.get(
  '/get-all-booking-and-post-12-month-latest',
  bookingAdminController.getListBookingAndPost12MonthLatest
);
bookingAdminRouter.get(
  '/get-all-booking-in-month',
  bookingAdminController.getListBookingInMonth
);
export default bookingAdminRouter;
