import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { Court } from '@prisma/client';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import courtHostService from './court.service';

const courtHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, branchesId, typeCourtId } = req.body;
    try {
      const court: Court = {
        id: 1,
        name,
        branchesId: Number(branchesId),
        typeCourtId: Number(typeCourtId),
        createdAt: new Date(),
        updatedAt: new Date(),
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
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await courtHostService.get(id);
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
};

export default courtHostController;
