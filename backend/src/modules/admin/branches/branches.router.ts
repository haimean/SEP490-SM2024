import { Router } from 'express';
import branchesAdminController from './branches.controller';

const branchesAdminRouter = Router();
branchesAdminRouter.get('/:id', branchesAdminController.get);
branchesAdminRouter.get('/', branchesAdminController.getAll);
branchesAdminRouter.post(
  '/',
  branchesAdminController.getAllWithAccount
);
branchesAdminRouter.put(
  '/:id/set-accept',
  branchesAdminController.setAccept
);
export default branchesAdminRouter;
