import { Router } from 'express';
import validate from '../../../utils/validate';
import statsValidator from './stats.validator';
import statsController from './stats.controller';

const statsRouter = Router();

statsRouter.post(
  '/monthly',
  validate(statsValidator.getMonthlyStats),
  statsController.getMonthlyStats
);

statsRouter.post(
  '/branch-usage-revenue',
  statsController.getBranchUsageRevenue
);

statsRouter.post('/court-usage-by-day', statsController.getCourtUsageByDay);
statsRouter.post('/court-usage-by-hour', statsController.getCourtUsageByHour);

export default statsRouter;
