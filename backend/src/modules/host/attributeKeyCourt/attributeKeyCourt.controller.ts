import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeCourtPayLoad } from './attributeKeyCourt.model';
import jwt, { Secret } from 'jsonwebtoken';
import { Account, AttributeCourt } from '@prisma/client';
import attributeCourtKeyHostService from './attributeKeyCourt.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';

const attributeKeyCourtHostController = {
  getAttributeKeyCourtWithAttributes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const attributeKeyCourtId = Number(req.params.id);
      const accountId = Number(req.headers.authorization);
      const data = await attributeCourtKeyHostService.getAttributeKeyCourtWithAttributes(attributeKeyCourtId, accountId);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  getAttributeKeyCourtsByAccountId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const data = await attributeCourtKeyHostService.getAttributeKeyCourtsByAccountId(accountId);
      ResponseHandler(res, data);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  
  createAttributeKeyCourtAndAttributeCourt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, value, typeCourtId } = req.body;
      const accountId = Number(req.headers.authorization);

      const newAttributeKeyCourt = await attributeCourtKeyHostService.createAttributeKeyCourtAndAttributeCourt({
        name,
        description,
        accountId,
        value,
        typeCourtId,
      });

      ResponseHandler(res, newAttributeKeyCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  
};

export default attributeKeyCourtHostController;
