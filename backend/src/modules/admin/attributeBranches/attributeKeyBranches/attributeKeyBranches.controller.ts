import { NextFunction, Request, Response, Router } from 'express';
import ResponseHandler from '../../../../outcomes/responseHandler';
import CustomError from '../../../../outcomes/customError';
import attributeKeyBranchesService from './attributeKeyBranches.service';
import { AttributeKeyBranchesPayLoad } from './attributeKeyBranches.model';

const attributeKeyBranchesController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeKeyBranchesPayLoad = req.body;
    try {
      const attributeType = await attributeKeyBranchesService.create(
        data
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
    const data: AttributeKeyBranchesPayLoad = req.body;
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
