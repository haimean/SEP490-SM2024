import { Router } from 'express';
import branchesGuestController from './branches.controller';

const branchesGuestRouter = Router();

branchesGuestRouter.get(
  '/top-3',
  branchesGuestController.getTopThree
);
branchesGuestRouter.get('/:id', branchesGuestController.get);
branchesGuestRouter.get('/', branchesGuestController.getAll);

export default branchesGuestRouter;
