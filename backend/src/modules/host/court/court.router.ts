import { Router } from 'express';
import validate from '../../../utils/validate';
import courtHostController from './court.controller';
import courtHostValidator from './court.validator';

const courtHostRouter = Router();

// create attribute  court
courtHostRouter.post(
  '/create-court',
  // validate(courtHostValidator.create),
  courtHostController.create
);

// get all attribute  court
courtHostRouter.get('/', courtHostController.getAll);

// get attribute  court
courtHostRouter.get('/branch/:id', courtHostController.get);
courtHostRouter.get('/:id', courtHostController.getDetail);

export default courtHostRouter;
