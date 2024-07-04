import { Router } from 'express';
import validate from '../../../utils/validate';
import courtHostController from './court.controller';
import courtHostValidator from './court.validator';

const courtHostRouter = Router();

// create court
courtHostRouter.post(
  '/create-court',
  validate(courtHostValidator.create),
  courtHostController.create
);

// get all court
courtHostRouter.get('/', courtHostController.getAll);

// get court
courtHostRouter.get('/branch/:id', courtHostController.get);

// get detail court
courtHostRouter.get('/:id', courtHostController.getDetail);

// update court
courtHostRouter.put(
  '/update-court/',
  validate(courtHostValidator.update),
  courtHostController.update
);

// delete court
courtHostRouter.delete(
  '/delete-court/:id',
  courtHostController.delete
);
export default courtHostRouter;
