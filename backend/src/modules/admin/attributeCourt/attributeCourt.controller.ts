import { NextFunction, Request, Response } from 'express';
import {
  AttributeCourtPayLoad,
  AttributeCourtUpdatePayLoad,
} from './attributeCourt.model';
import attributeCourtService from './attributeCourt.service';
import ResponseHandler from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { AttributeCourt } from '@prisma/client';

const attributeCourtController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeCourtPayLoad = req.body;
    console.log('aaaaaaa', data);
    try {
      const attributeCourt: AttributeCourt = {
        accountId: 1,
        // accountId: req.body.account.id,
        isPublic: true,
        value: data.value,
        attributeKeyCourtId: data.attributeKeyCourtId,
        id: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const attributeType = await attributeCourtService.create(
        attributeCourt
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
  update: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeCourtUpdatePayLoad = req.body;
    try {
      const attributeCourt: AttributeCourt = {
        id: Number(req.params.id),
        accountId: 1,
        // accountId: req.body.account.id,
        isPublic: true,
        value: data.value,
        attributeKeyCourtId: data.attributeKeyCourtId,
        isActive: data.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const attributeType = await attributeCourtService.update(
        attributeCourt
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
  remove: async (req: Request, res: Response, next: NextFunction) => {
    ResponseHandler(res, { todo: 'todo' });
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await attributeCourtService.getAll();
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const data = await attributeCourtService.get(id);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeCourtController;
