import { Router } from 'express';
import accountController from './account.controller';

const accountRouter = Router();
accountRouter.get('/', accountController.listAccount);
export default accountRouter;
