import { Router } from 'express';
import bookingUserController from './booking.controller';
import validate from '../../../utils/validate';
import bookingUserValidator from './booking.validator';

const bookingUserRouter = Router();

bookingUserRouter.delete('/:id/', bookingUserController.remove);
bookingUserRouter.post(
  '/get-all-for-user/',
  validate(bookingUserValidator.getAllForUser),
  bookingUserController.getAllForUser
);
bookingUserRouter.post(
  '/',
  validate(bookingUserValidator.create),
  bookingUserController.create
);
bookingUserRouter.get('/detail/:id', bookingUserController.getDetail);
export default bookingUserRouter;
