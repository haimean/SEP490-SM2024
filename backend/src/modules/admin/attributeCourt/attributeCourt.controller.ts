import { NextFunction, Request, Response } from 'express';
import {
  AttributeCourtPayLoad,
  AttributeCourtUpdatePayLoad,
} from './attributeCourt.model';
import attributeCourtService from './attributeCourt.service';
import ResponseHandler from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { Account, AttributeCourt } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

const attributeCourtController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeCourtPayLoad = req.body;

    const secret: Secret = process.env.SECRET_JWT_KEY ?? '';

    const token = req.headers?.authorization?.split(' ')[1] ?? '';

    const jwtObj: { data: Account } = jwt.verify(token, secret) as {
      data: Account;
    };
    try {
      const attributeCourt: AttributeCourt = {
        accountId: jwtObj.data.id,
        value: data.value,
        attributeKeyCourtId: data.attributeKeyCourtId,
        isPublic: true,
        isActive: true,
        id: 0,
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
