import { Router } from 'express';
import bookingHostController from './booking.controller';

const bookingHostRouter = Router();
bookingHostRouter.post('/', bookingHostController.getBookingList);
export default bookingHostRouter;
