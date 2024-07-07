import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../../outcomes/customError';
import attributeKeyBranchesService from './attributeKeyBranches.service';
import {
  AttributeKeyBranchesPayLoad,
  AttributeKeyBranchesUpdatePayLoad,
} from './attributeKeyBranches.model';
import { ResponseHandler } from '../../../../outcomes/responseHandler';

const attributeKeyBranchesController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, description }: AttributeKeyBranchesPayLoad =
      req.body;
    try {
      const attributeType = await attributeKeyBranchesService.create({
        name,
        description,
      });
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
    const data: AttributeKeyBranchesUpdatePayLoad = req.body;
    try {
      const attributeType = await attributeKeyBranchesService.update(
        Number(req.params.id),
        data
      );
      ResponseHandler(res, attributeType);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    ResponseHandler(res, { todo: 'todo' });
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await attributeKeyBranchesService.getAll();
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await attributeKeyBranchesService.get(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeKeyBranchesController;
