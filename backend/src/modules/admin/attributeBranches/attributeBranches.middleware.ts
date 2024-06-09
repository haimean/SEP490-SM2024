import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import { AttributeKeyBranches } from '@prisma/client';
import attributeBranchesService from './attributeBranches.service';
import { AttributeBranchesPayLoad } from './attributeBranches.model';

const attributeBranchesMiddleware = {
  findAttributeKeyBranches: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: AttributeBranchesPayLoad = req.body;

    try {
      const attributeKeyBranchesId = data.attributeKeyBranchesId;
      const attributeKeyBranches: AttributeKeyBranches | null =
        await attributeBranchesService.findAttributeKeyBranches(
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

export default attributeBranchesMiddleware;
