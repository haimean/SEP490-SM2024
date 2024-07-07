import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import attributeBranchesServiceBase from '../../../baseService/attributeBranchesServiceBase';
import NotFoundError from '../../../outcomes/notFoundError';
import { ErrorCallback } from 'typescript';
import { uploadFile } from '../../../lib/s3';
import courtServiceBase from '../../../baseService/courtServiceBase';

interface BranchesHostMiddleware {
  create: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

const branchesHostMiddleware: BranchesHostMiddleware = {
  create: async (req, res, next) => {
    try {
      const files: any = req.files;
      const accountId: number = Number(req.headers.authorization);
      const { attributeBranches, court } = req.body;

      attributeBranches?.forEach(async (id: number) => {
        const dataAttributeBranches =
          await attributeBranchesServiceBase.findById(id);
        if (!dataAttributeBranches?.isActive) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
        if (
          accountId !== dataAttributeBranches?.accountId &&
          dataAttributeBranches?.isPublic
        ) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
      });
      court?.forEach(async (id: number) => {
        const dataCourt = await courtServiceBase.findById(id);
        if (!dataCourt) {
          next(new NotFoundError('Không tồn tại sân'));
        }

        next();
      });

      //check file
      if (files['businessLicense'][0]) {
        req.body.businessLicense = await uploadFile(
          files['businessLicense'][0]
        );
      }

      if (files['image'][0]) {
        req.body.image = await uploadFile(files['image'][0]);
      }
      next();
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesHostMiddleware;
