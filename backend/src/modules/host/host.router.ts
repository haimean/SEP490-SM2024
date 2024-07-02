import { Router } from 'express';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';
import typeCourtHostRouter from './typeCourt/typeCourt.router';

const hostRouter = Router();
hostRouter.use('attribute-court', attributeCourtHostRouter);
hostRouter.use('type-court', typeCourtHostRouter);

export default hostRouter;
