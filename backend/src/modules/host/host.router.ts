import { Router } from 'express';
import courtHostRouter from './court/court.router';
import attributeCourtHostRouter from './attributeCourt/attributeCourt.router';

const hostRouter = Router();
hostRouter.use('court', courtHostRouter);
hostRouter.use('attribute-court', attributeCourtHostRouter);

export default hostRouter;
