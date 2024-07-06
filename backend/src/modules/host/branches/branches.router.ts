import { Router } from 'express';
import validate from '../../../utils/validate';
import upload from '../../../lib/uploadImage';
import branchesHostController from './branches.controller';
import branchesHostValidator from './branches.validator';
import branchesHostMiddleware from './branches.middleware';

const branchesHostRouter = Router();
branchesHostRouter.get('/:id', branchesHostController.get);
branchesHostRouter.get('/', branchesHostController.listBranch);
// create branch
branchesHostRouter.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 },
  ]),
  validate(branchesHostValidator.create),
  branchesHostMiddleware.create,
  branchesHostController.create
);
export default branchesHostRouter;
