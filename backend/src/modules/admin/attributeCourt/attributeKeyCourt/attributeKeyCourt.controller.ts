import { NextFunction, Request, Response, Router } from 'express';
import ResponseHandler from '../../../../outcomes/responseHandler';
import CustomError from '../../../../outcomes/customError';
import attributeKeyCourtService from './attributeKeyCourt.service';
import {
  AttributeKeyCourtPayLoad,
  AttributeKeyCourtUpdatePayLoad,
} from './attributeKeyCourt.model';

const attributeKeyCourtController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name, description }: AttributeKeyCourtPayLoad = req.body;

    try {
      const attributeType = await attributeKeyCourtService.create({
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
    const data: AttributeKeyCourtUpdatePayLoad = req.body;
    try {
      const attributeType = await attributeKeyCourtService.update(
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
      const data = await attributeKeyCourtService.getAll();
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await attributeKeyCourtService.get(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeKeyCourtController;
