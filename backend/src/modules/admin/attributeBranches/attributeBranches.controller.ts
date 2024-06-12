import { NextFunction, Request, Response } from 'express';
import attributeBranchesService from './attributeBranches.service';
import {
  AttributeBranchesPayLoad,
  AttributeBranchesUpdatePayLoad,
} from './attributeBranches.model';
import ResponseHandler from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { AttributeBranches } from '@prisma/client';

const attributeBranchesController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeBranchesPayLoad = req.body;
    try {
      const attributeBranches: AttributeBranches = {
        accountId: 1,
        // accountId: req.body.account.id,
        isPublic: true,
        value: data.value,
        attributeKeyBranchesId: data.attributeKeyBranchesId,
        id: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const attributeType = await attributeBranchesService.create(
        attributeBranches
      );
      ResponseHandler(res, attributeType);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Name already exists.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeBranchesUpdatePayLoad = req.body;
    try {
      const attributeBranches: AttributeBranches = {
        accountId: 1,
        // accountId: req.body.account.id,
        isPublic: true,
        value: data.value,
        attributeKeyBranchesId: data.attributeKeyBranchesId,
        isActive: data.isActive,
        id: Number(req.params.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const attributeType = await attributeBranchesService.update(
        attributeBranches
      );
      ResponseHandler(res, attributeType);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Name already exists.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    ResponseHandler(res, { todo: 'todo' });
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await attributeBranchesService.getAll();
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await attributeBranchesService.get(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeBranchesController;
