import { Router } from 'express';
import attributeCourtRouter from './attributeCourt/attributeCourt.router';

const adminRouter = Router();
adminRouter.use('/attribute-court', attributeCourtRouter);

export default adminRouter;
