import { Router } from 'express';
import attributeKeyCourtRouter from './attributeKeyCourt/attributeKeyCourt.router';

const attributeCourtRouter = Router();

attributeCourtRouter.use('/key', attributeKeyCourtRouter);

export default attributeCourtRouter;
