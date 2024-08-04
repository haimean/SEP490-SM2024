import { Request, Response, NextFunction } from 'express';
import statsService from './stats.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const statsController = {
  getMonthlyStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { branchId, month } = req.body;

      if (!branchId || !month) {
        throw new CustomError('BranchId and month are required', 400);
      }

      const stats = await statsService.getMonthlyStats(Number(branchId), new Date(month));
      ResponseHandler(res, stats);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getBranchUsageRevenue: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { branchId, month } = req.body;

      if (!branchId || !month) {
        throw new CustomError('BranchId and month are required', 400);
      }

      const stats = await statsService.getBranchUsageRevenue(Number(branchId), new Date(month));
      ResponseHandler(res, stats);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getCourtUsageByDay: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courtId, month } = req.body;

      if (!courtId || !month) {
        throw new CustomError('CourtId and month are required', 400);
      }

      const usageByDay = await statsService.getCourtUsageByDay(Number(courtId), new Date(month));
      ResponseHandler(res, usageByDay);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getCourtUsageByHour: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courtId, month } = req.body;

      if (!courtId || !month) {
        throw new CustomError('CourtId and month are required', 400);
      }

      const usageByHour = await statsService.getCourtUsageByHour(Number(courtId), new Date(month));
      ResponseHandler(res, usageByHour);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default statsController;
