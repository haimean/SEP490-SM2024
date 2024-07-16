import { Router } from 'express';
import bookCourtHostController from './bookCourt.controller';

const bookCourtHostRouter = Router();
bookCourtHostRouter.post (
  '/',
  bookCourtHostController.getBookCourtList
);
export default bookCourtHostRouter;
