import { Router } from 'express';
import attributeKeyCourtController from './attributeKeyCourt.controller';
import attributeKeyCourtValidator from './attributeKeyCourt.validator';
import validate from '../../../../utils/validate';

const attributeKeyCourtRouter = Router();

// create attribute key court
attributeKeyCourtRouter.post(
  '/',
  validate(attributeKeyCourtValidator.create),
  attributeKeyCourtController.create
);

// update attribute key court
attributeKeyCourtRouter.put(
  '/:id',
  validate(attributeKeyCourtValidator.update),
  attributeKeyCourtController.update
);

// remove attribute key court
attributeKeyCourtRouter.delete(
  '/:id',
  attributeKeyCourtController.remove
);

// get all attribute key court
attributeKeyCourtRouter.get('/', attributeKeyCourtController.getAll);

// get attribute key court
attributeKeyCourtRouter.get('/:id', attributeKeyCourtController.get);

export default attributeKeyCourtRouter;
