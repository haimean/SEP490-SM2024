import { Router } from 'express';
import bookingUserController from './booking.controller';

const bookingUserRouter = Router();

bookingUserRouter.delete('/:id/', bookingUserController.remove);
export default bookingUserRouter;
