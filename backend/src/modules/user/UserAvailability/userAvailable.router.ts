import { Router } from 'express';
import userAvailableController from './userAvailability.controller';

const userAvailableRouter = Router();
userAvailableRouter.post('/', userAvailableController.listAvailable);
export default userAvailableRouter;
