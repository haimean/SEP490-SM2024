import { Router } from 'express';

import validate from '../../../utils/validate';
import upload from '../../../lib/uploadImage';

import typeCourtHostValidator from './typeCourt.validator';
import typeCourtHostController from './typeCourt.controller';

const typeCourtHostRouter = Router();
// create
typeCourtHostRouter.post(
  '/',
  upload.single('image'),
  validate(typeCourtHostValidator.create),
  typeCourtHostController.create
);

// update
typeCourtHostRouter.put(
  '/:id',
  upload.single('image'),
  validate(typeCourtHostValidator.create),
  typeCourtHostController.update
);

// get all
typeCourtHostRouter.get('/', typeCourtHostController.getAll);

// get
typeCourtHostRouter.get('/:id', typeCourtHostController.get);
// get all price of type court
typeCourtHostRouter.get(
  '/:id/price',
  typeCourtHostController.getPrice
);
export default typeCourtHostRouter;
