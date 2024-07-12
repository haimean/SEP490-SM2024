import { Router } from 'express';
import userAvailableRouter from './UserAvailability/userAvailable.router';

const playerRouter = Router();

playerRouter.use('/user-available', userAvailableRouter);

export default playerRouter;
