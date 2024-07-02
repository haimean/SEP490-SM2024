import { Router } from 'express';
import branchesHostController from './branches.controller';
import upload from '../../../lib/uploadImage';
import branchesHostValidator from './branches.validator';
import validate from '../../../utils/validate';

const branchesHostRouter = Router();
branchesHostRouter.get('/', branchesHostController.listBranch);
// create branch
branchesHostRouter.post(
  '/',
  upload.single('image'),
  validate(branchesHostValidator.create),
  branchesHostController.create
);
export default branchesHostRouter;
