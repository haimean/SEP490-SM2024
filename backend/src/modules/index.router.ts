import { Router } from 'express';
import errorHandler from '../utils/errorHandler';
import guestRouter from './guest/index.router';
import hostRouter from './host/host.router';
import middleware from './index.middleware';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';
import userRouter from './user/user.router';
import upload from '../lib/uploadImage';
import { deleteFile, uploadFile } from '../lib/s3';

const routes: Router = Router();

routes.use('/', guestRouter);
routes.use('/auth', authRouter);
routes.use('/user', middleware.player, userRouter);
routes.use('/admin', middleware.admin, adminRouter);
routes.use('/host', middleware.host, hostRouter);
routes.put(
  '/upload',
  upload.single('image'), // our uploadImage middleware
  async (req, res, next) => {
    const file = req.file;
    const imageName = await uploadFile(file);
    deleteFile(imageName);
    // if (req.file) {
    //   const imageUrl = await getObjectSignedUrl(imageName);
    // }
    res
      .status(200)
      .json({ status: 'success', data: req.body.number });
  }
);

routes.use(errorHandler);
export default routes;
