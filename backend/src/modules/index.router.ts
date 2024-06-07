import { Router } from 'express';
import errorHandler from '../utils/errorHandler';
import guestRouter from './guest/index.router';
import hostRouter from './host/index.router';
import playerRouter from './player/index.router';
import middlewares from './index.middleware';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';

const routes: Router = Router();
routes.use('/', guestRouter);
routes.use('/auth', authRouter);
routes.use('/admin', adminRouter);
routes.use('/host', middlewares.host, hostRouter);
routes.use('/player', middlewares.player, playerRouter);

routes.use(errorHandler);
export default routes;
