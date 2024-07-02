import { NextFunction, Request, Response } from 'express';
import branchesHostService from './branches.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';
import { uploadFile } from '../../../lib/s3';
import { Branches } from '@prisma/client';
import { BranchesHostServiceCreate } from './branches.model';

const branchesHostController = {
  listBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, isVerify, email, currentPage, pageSize } =
        req.body;
      const result = await branchesHostService.listBranch(
        name,
        isVerify,
        email,
        Number(currentPage),
        Number(pageSize)
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  // FIXED:
  create: async (req: Request, res: Response, next: NextFunction) => {
    let imageName: string = '';
    const file = req.file;
    //check file
    if (file) {
      imageName = await uploadFile(file);
    }

    try {
    } catch (error: any) {
      const accountId = Number(req.headers.authorization);
      const {
        name,
        description,
        addressLatitude,
        addressLongitude,
        attributeBranches,
        court,
      } = req.body;
      const payload: BranchesHostServiceCreate = {
        accountId,
        name,
        description,
        addressLatitude,
        addressLongitude,
        attributeBranches,
        court,
        image: imageName,
      };

      const branches: Branches = await branchesHostService.create(
        payload
      );
      ResponseHandler(res, branches);
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên cơ sở đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesHostController;
