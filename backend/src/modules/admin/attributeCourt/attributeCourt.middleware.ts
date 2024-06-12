import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeKeyCourt } from '@prisma/client';
import attributeCourtService from './attributeCourt.service';
import { AttributeCourtPayLoad } from './attributeCourt.model';

const attributeCourtMiddleware = {
  findAttributeKeyCourt: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: AttributeCourtPayLoad = req.body;
      const attributeKeyCourtId = data.attributeKeyCourtId;
      console.log('aaaa', data);
      
      const attributeKeyCourt: AttributeKeyCourt | null =
        await attributeCourtService.findAttributeKeyCourt(
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

export default attributeCourtMiddleware;
