import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeCourtPayLoad } from './attributeCourt.model';
import jwt, { Secret } from 'jsonwebtoken';
import { Account, AttributeCourt } from '@prisma/client';
import attributeCourtHostService from './attributeCourt.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';

const attributeCourtHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const data: AttributeCourtPayLoad = req.body;
    const accountId = Number(req.headers.authorization);
    try {
      const attributeCourt: AttributeCourt = {
        accountId,
        value: data.value,
        attributeKeyCourtId: data.attributeKeyCourtId,
        isPublic: false,
        isActive: true,
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const attributeType = await attributeCourtHostService.create(
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
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const data = await attributeCourtHostService.getAll(accountId);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const accountId = Number(req.headers.authorization);
      const data = await attributeCourtHostService.get(id, accountId);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  linkAttributeCourtToTypeCourt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { typeCourtId, attributeCourtId } = req.body;
      const data = await attributeCourtHostService.linkAttributeCourtToTypeCourt({ typeCourtId, attributeCourtId });
      res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default attributeCourtHostController;
