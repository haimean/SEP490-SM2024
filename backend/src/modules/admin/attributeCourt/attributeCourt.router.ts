import { Router } from 'express';
import attributeKeyCourtRouter from './attributeKeyCourt/attributeKeyCourt.router';
import attributeCourtValidator from './attributeCourt.validator';
import attributeCourtController from './attributeCourt.controller';
import validate from '../../../utils/validate';
import attributeCourtMiddleware from './attributeCourt.middleware';

const attributeCourtRouter = Router();

attributeCourtRouter.use('/key', attributeKeyCourtRouter);

// create attribute  court
attributeCourtRouter.post(
  '/',
  validate(attributeCourtValidator.create),
  attributeCourtMiddleware.findEmail,
  attributeCourtController.create
);

// update attribute  court
attributeCourtRouter.put(
  '/:id',
  validate(attributeCourtValidator.update),
  attributeCourtMiddleware.findEmail,
  attributeCourtController.update
);

// TODO:
// remove attribute  court
attributeCourtRouter.delete('/:id', attributeCourtController.remove);

// get all attribute  court
attributeCourtRouter.get('/', attributeCourtController.getAll);

// get attribute  court
attributeCourtRouter.get('/:id', attributeCourtController.get);

export default attributeCourtRouter;
