import { Router } from 'express';
import attributeBranchesHostMiddleware from './attributeBranches.middleware';
import attributeBranchesHostValidator from './attributeBranches.validator';
import attributeBranchesHostController from './attributeBranches.controller';
import validate from '../../../utils/validate';

const attributeBranchesHostRouter = Router();

// create attribute  court
attributeBranchesHostRouter.post(
  '/',
  validate(attributeBranchesHostValidator.create),
  attributeBranchesHostMiddleware.findAttributeKeyCourt,
  attributeBranchesHostController.create
);

// get all attribute  court
attributeBranchesHostRouter.get(
  '/',
  attributeBranchesHostController.getAll
);

// get attribute  court
attributeBranchesHostRouter.get(
  '/:id',
  attributeBranchesHostController.get
);

export default attributeBranchesHostRouter;
