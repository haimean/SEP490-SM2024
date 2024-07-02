import { AttributeKeyCourt } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeCourtPayLoad } from './attributeCourt.model';
import attributeCourtHostService from './attributeCourt.service';

const attributeCourtHostMiddleware = {
  findAttributeKeyCourt: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: AttributeCourtPayLoad = req.body;
      const attributeKeyCourtId = data.attributeKeyCourtId;
      const attributeKeyCourt: AttributeKeyCourt | null =
        await attributeCourtHostService.findAttributeKeyCourt(
          attributeKeyCourtId
        );
      if (attributeKeyCourt) {
        next();
      } else {
        next(new CustomError('Attribute Court does not exist.', 409));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeCourtHostMiddleware;
