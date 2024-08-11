import { Router } from 'express';
import validate from '../../../utils/validate';
import { upload } from '../../../lib/upload';
import typeCourtHostValidator from './typeCourt.validator';
import typeCourtHostController from './typeCourt.controller';
import typeCourtHostMiddleware from './typeCourt.middelware';

const typeCourtHostRouter = Router();
// create
typeCourtHostRouter.post(
  '/',
  upload.single('image'),
  typeCourtHostMiddleware.isBeforeCreate,
  validate(typeCourtHostValidator.create),
  typeCourtHostController.create
);

// update
typeCourtHostRouter.put(
  '/:id',
  upload.single('image'),
  typeCourtHostMiddleware.isBeforeCreate,
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

typeCourtHostRouter.post(
  '/:id/price',
  validate(typeCourtHostValidator.createPrice),
  typeCourtHostController.createPrice
);
typeCourtHostRouter.put(
  '/:id/price',
  validate(typeCourtHostValidator.updatePrice),
  typeCourtHostController.updatePrice
);

typeCourtHostRouter.delete(
  '/:id/price',
  validate(typeCourtHostValidator.deletePrice),
  typeCourtHostController.deletePrice
);
typeCourtHostRouter.delete('/:id', typeCourtHostController.delete);

typeCourtHostRouter.put(
  '/:typeCourtId/attribute/:oldAttributeCourtId/:newAttributeCourtId',
  typeCourtHostController.replaceAttributeCourt
);

export default typeCourtHostRouter;
