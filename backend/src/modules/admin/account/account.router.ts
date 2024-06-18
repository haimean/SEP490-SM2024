import { Router } from 'express';
import accountController from './account.controller';
import validate from '../../../utils/validate';
import adminAccountValidator from './account.validator';

const accountRouter = Router();
accountRouter.get(
  '/',
  validate(adminAccountValidator.update),
  accountController.listAccount
);
export default accountRouter;
