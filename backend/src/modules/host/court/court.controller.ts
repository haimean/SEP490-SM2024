import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import courtHostService from './court.service';
import { CourtPayload, CreateCourt } from './court.model';

const courtHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, branchesId, typeCourtId } = req.body;
    try {
      const court: CreateCourt = {
        name,
        branchesId: Number(branchesId),
        typeCourtId: Number(typeCourtId),
      };
      const attributeType = await courtHostService.create(court);
      ResponseHandler(res, attributeType);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('value')
      ) {
        next(new CustomError('Value already exists.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await courtHostService.getAll();
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const data = await courtHostService.getDetail(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await courtHostService.get(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, branchesId, typeCourtId } = req.body;
    try {
      const court: CourtPayload = {
        id,
        name,
        branchesId: Number(branchesId),
        typeCourtId: Number(typeCourtId),
      };
      const result = await courtHostService.update(court);
      ResponseHandler(res, result);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('value')
      ) {
        next(new CustomError('Value already exists.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await courtHostService.delete(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default courtHostController;
