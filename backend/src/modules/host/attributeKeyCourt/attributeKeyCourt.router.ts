import { Router } from 'express';
import validate from '../../../utils/validate';
import attributeCourtHostValidator from './attributeKeyCourt.validator';
// import attributeCourtHostMiddleware from './attributeKeyCourt.middleware';
import attributeKeyCourtHostController from './attributeKeyCourt.controller';

const attributeKeyCourtHostRouter = Router();

attributeKeyCourtHostRouter.get(
  '/account',
  attributeKeyCourtHostController.getAttributeKeyCourtsByAccountId
);

// get attribute key court with attributes
attributeKeyCourtHostRouter.get(
  '/:id',
  attributeKeyCourtHostController.getAttributeKeyCourtWithAttributes
);

attributeKeyCourtHostRouter.post('/', attributeKeyCourtHostController.createAttributeKeyCourtAndAttributeCourt);

export default attributeKeyCourtHostRouter;
