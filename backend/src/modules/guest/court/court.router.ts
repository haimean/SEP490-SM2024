import { Router } from 'express';
import courtController from './court.controller';

const courtRouter = Router();
courtRouter.get('/', courtController.getAll);

// get court
courtRouter.get('/branch/:id', courtController.get);

// get detail court
courtRouter.get('/:id', courtController.getDetail);
export default courtRouter;
