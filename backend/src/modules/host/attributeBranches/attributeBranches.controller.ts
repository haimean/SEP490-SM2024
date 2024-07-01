import { NextFunction, Request, Response } from 'express';
import { AttributeBranchesPayLoad } from './attributeBranches.model';
import { AttributeBranches } from '@prisma/client';
import attributeBranchesHostService from './attributeBranches.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const attributeBranchesHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeBranchesPayLoad = req.body;
    try {
      const attributeBranches: AttributeBranches = {
        accountId: Number(req.headers.authorization),
        value: data.value,
        attributeKeyBranchesId: data.attributeKeyBranchesId,
        isPublic: false,
        isActive: true,
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const attributeType = await attributeBranchesHostService.create(
        attributeBranches
      );
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
      const data = await attributeBranchesHostService.getAll(
        Number(req.headers.authorization)
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await attributeBranchesHostService.get(
        id,
        Number(req.headers.authorization)
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeBranchesHostController;
