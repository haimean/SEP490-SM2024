import { Router } from 'express';
import bookingHostController from './booking.controller';
import validate from '../../../utils/validate';
import bookingHostValidator from './booking.validator';

const bookingHostRouter = Router();
bookingHostRouter.post('/', bookingHostController.getBookingList);
bookingHostRouter.post(
  '/history',
  validate(bookingHostValidator.history),
  bookingHostController.getBookingHostList
);
bookingHostRouter.post(
  '/booking-list',
  bookingHostController.getBookingHostByBranch
);
bookingHostRouter.post(
  '/get-booking',
  bookingHostController.getBookingHostByBranch
);

bookingHostRouter.post(
  '/',
  validate(bookingHostValidator.create),
  bookingHostController.create
);
bookingHostRouter.get('/detail/:id', bookingHostController.getDetail);
bookingHostRouter.put(
  '/cancel',
  validate(bookingHostValidator.cancel),
  bookingHostController.cancel
);
bookingHostRouter.post(
  '/get-for-week/',
  validate(bookingHostValidator.getAForWeek),
  bookingHostController.getAForWeek
);

export default bookingHostRouter;
