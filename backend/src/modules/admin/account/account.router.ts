import { Router } from 'express';
import accountController from './account.controller';
import validate from '../../../utils/validate';
import adminAccountValidator from './account.validator';

const accountRouter = Router();
accountRouter.post(
  '/',
  validate(adminAccountValidator.update),
  accountController.listAccount
);
accountRouter.post('/ban/:id', accountController.banAccount);
export default accountRouter;
