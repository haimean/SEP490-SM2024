import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeKeyBranches } from '@prisma/client';
import attributeCourtService from './attributeCourt.service';

const attributeCourtMiddleware = {
  findEmail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const attributeKeyBranchesId = req.body.attributeKeyBranchesId;
      const attributeKeyBranches: AttributeKeyBranches | null =
        await attributeCourtService.findAttributeBranches(
          attributeKeyBranchesId
        );
      if (attributeKeyBranches) {
        next();
      } else {
        next(
          new CustomError('Attribute Branches does not exist.', 409)
        );
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default attributeCourtMiddleware;
