import { Router } from 'express';
import attributeKeyBranchesController from './attributeKeyBranches.controller';
import attributeKeyBranchesValidator from './attributeKeyBranches.validator';
import validate from '../../../../utils/validate';

const attributeKeyBranchesRouter = Router();

// create attribute key Branches
attributeKeyBranchesRouter.post(
  '/',
  validate(attributeKeyBranchesValidator.create),
  attributeKeyBranchesController.create
);

// update attribute key Branches
attributeKeyBranchesRouter.put(
  '/:id',
  validate(attributeKeyBranchesValidator.update),
  attributeKeyBranchesController.update
);

// remove attribute key Branches
attributeKeyBranchesRouter.delete(
  '/:id',
  attributeKeyBranchesController.remove
);

// get all attribute key Branches
attributeKeyBranchesRouter.get(
  '/',
  attributeKeyBranchesController.getAll
);

// get attribute key Branches
attributeKeyBranchesRouter.get(
  '/:id',
  attributeKeyBranchesController.get
);

export default attributeKeyBranchesRouter;
