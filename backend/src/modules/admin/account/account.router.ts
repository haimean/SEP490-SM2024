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
accountRouter.put('/ban/:id', accountController.banAccount);
accountRouter.get('/month', accountController.listMonthAccount);
accountRouter.get('/get-all', accountController.getListAccountNoSort);
accountRouter.get(
  '/get-all-account-12-month-latest',
  accountController.getListAccount12MonthLatest
);
accountRouter.post(
  '/get-all-account-with-date',
  accountController.getListAccountWithDate
);
accountRouter.post(
  '/get-all-account-in-month',
  accountController.getListAccountInMonth
);
export default accountRouter;
