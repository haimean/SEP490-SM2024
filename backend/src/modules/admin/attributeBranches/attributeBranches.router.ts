import { Router } from 'express';
import attributeKeyBranchesRouter from './attributeKeyBranches/attributeKeyBranches.router';
import attributeBranchesController from './attributeBranches.controller';
import attributeBranchesValidator from './attributeBranches.validator';
import attributeBranchesMiddleware from './attributeBranches.middleware';
import validate from '../../../utils/validate';

const attributeBranchesRouter = Router();

attributeBranchesRouter.use('/key', attributeKeyBranchesRouter);

// create attribute  court
attributeBranchesRouter.post(
  '/',
  validate(attributeBranchesValidator.create),
  attributeBranchesMiddleware.findAttributeKeyBranches,
  attributeBranchesController.create
);

// update attribute  court
attributeBranchesRouter.put(
  '/:id',
  validate(attributeBranchesValidator.update),
  attributeBranchesMiddleware.findAttributeKeyBranches,
  attributeBranchesController.update
);

// TODO:
// remove attribute  court
attributeBranchesRouter.delete(
  '/:id',
  attributeBranchesController.remove
);

// get all attribute  court
attributeBranchesRouter.get('/', attributeBranchesController.getAll);

// get attribute  court
attributeBranchesRouter.get('/:id', attributeBranchesController.get);

export default attributeBranchesRouter;
