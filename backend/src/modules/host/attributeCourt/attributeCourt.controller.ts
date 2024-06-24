import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import ResponseHandler from '../../../outcomes/responseHandler';
import { AttributeCourtPayLoad } from './attributeCourt.model';
import jwt, { Secret } from 'jsonwebtoken';
import { Account, AttributeCourt } from '@prisma/client';
import attributeCourtService from '../../admin/attributeCourt/attributeCourt.service';
import attributeCourtHostService from './attributeCourt.service';

const attributeCourtHostController = {
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
      const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      const data = await attributeCourtHostService.getAll(
        jwtObj.data.id
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };
      const id = Number(req.params.id);
      const data = await attributeCourtHostService.get(
        id,
        jwtObj.data.id
      );
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeCourtHostController;
