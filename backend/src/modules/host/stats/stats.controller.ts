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
      const { courtId, month, branchId } = req.body;

      if (!courtId || !month || !branchId) {
        throw new CustomError('CourtId, month and branchId are required', 400);
      }

      const usageByDay = await statsService.
      getCourtUsageByDay(courtId === 'all' ? courtId : Number(courtId), new Date(month), branchId);
      ResponseHandler(res, usageByDay);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getCourtUsageByHour: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courtId, month, branchId } = req.body;

      if (!courtId || !month || !branchId) {
        throw new CustomError('CourtId, month and branchId are required', 400);
      }

      const usageByHour = await statsService.
      getCourtUsageByHour(courtId === 'all' ? courtId : Number(courtId), new Date(month), branchId);
      ResponseHandler(res, usageByHour);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default statsController;
