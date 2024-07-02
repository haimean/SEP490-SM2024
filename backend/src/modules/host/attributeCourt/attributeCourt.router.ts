import { Router } from 'express';
import validate from '../../../utils/validate';
import attributeCourtHostValidator from './attributeCourt.validator';
import attributeCourtHostMiddleware from './attributeCourt.middleware';
import attributeCourtHostController from './attributeCourt.controller';

const attributeCourtHostRouter = Router();

// create attribute  court
attributeCourtHostRouter.post(
  '/',
  validate(attributeCourtHostValidator.create),
  attributeCourtHostMiddleware.findAttributeKeyCourt,
  attributeCourtHostController.create
);

// get all attribute  court
attributeCourtHostRouter.get(
  '/',
  attributeCourtHostController.getAll
);

// get attribute  court
attributeCourtHostRouter.get(
  '/:id',
  attributeCourtHostController.get
);

export default attributeCourtHostRouter;
