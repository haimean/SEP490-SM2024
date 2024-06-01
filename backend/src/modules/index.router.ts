import { Router } from 'express';
import errorHandler from '../utils/errorHandler';
import adminRouter from './admin/index.router';
import guestRouter from './guest/index.router';
import hostRouter from './host/index.router';
import playerRouter from './player/index.router';
import middlewares from './index.middleware';
import authRouter from './auth/auth.router';

const routes: Router = Router();
routes.use('/', guestRouter);
routes.use('/auth', authRouter);
routes.use('/admin', middlewares.admin, adminRouter);
routes.use('/host', hostRouter);
routes.use('/player', playerRouter);

routes.use(errorHandler);
export default routes;
