import { Router } from 'express';
import validate from '../../../utils/validate';
import branchesHostController from './branches.controller';
import branchesHostValidator from './branches.validator';
import branchesHostMiddleware from './branches.middleware';
import { upload } from '../../../lib/upload';

const branchesHostRouter = Router();
branchesHostRouter.get('/total', branchesHostController.totalBranch);
branchesHostRouter.get('/', branchesHostController.listBranch);
// create branch
branchesHostRouter.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'businessLicense', maxCount: 1 },
  ]),
  branchesHostMiddleware.isBeforeCreate,
  validate(branchesHostValidator.create),
  branchesHostMiddleware.create,
  branchesHostController.create
);

//update branches
branchesHostRouter.put(
  '/:id',
  upload.single('image'),
  validate(branchesHostValidator.update),
  branchesHostMiddleware.update,
  branchesHostController.updateInformation
);
branchesHostRouter.put(
  '/branch-delete/:id',
  branchesHostController.delete
);
branchesHostRouter.get('/:id', branchesHostController.get);
export default branchesHostRouter;
