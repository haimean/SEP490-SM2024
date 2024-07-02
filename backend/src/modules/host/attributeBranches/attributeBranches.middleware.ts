import { NextFunction, Request, Response } from 'express';
import { AttributeBranchesPayLoad } from './attributeBranches.model';
import attributeBranchesHostService from './attributeBranches.service';
import { AttributeKeyBranches } from '@prisma/client';
import CustomError from '../../../outcomes/customError';

const attributeBranchesHostMiddleware = {
  findAttributeKeyCourt: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: AttributeBranchesPayLoad = req.body;
      const attributeKeyBranchesId = data.attributeKeyBranchesId;
      const attributeKeyCourt: AttributeKeyBranches | null =
        await attributeBranchesHostService.findAttributeKeyBranches(
          attributeKeyBranchesId
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

export default attributeBranchesHostMiddleware;
