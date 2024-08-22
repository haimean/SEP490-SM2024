import { NextFunction, Request, Response } from 'express';

import { Branches, Prisma } from '@prisma/client';

import CustomError from '../../../outcomes/customError';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import { AddressBranchHostServiceCreate, BranchesHostServiceCreate } from './branches.model';
import branchesHostService from './branches.service';

const branchesHostController = {
  listBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const result = await branchesHostService.listBranch(accountId);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const id = Number(req.params.id);

      const result = await branchesHostService.get(accountId, id);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  totalBranch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = Number(req.headers.authorization);
      const result = await branchesHostService.totalBranch(accountId);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const {
        name,
        description,
        businessLicense,
        closingHours,
        openingHours,
        email,
        image,
        phone,
        detail,
        districts,
        latitude,
        longitude,
        provinces,
        wards,
        attributeBranches,
        court,
      } = req.body;

      const branchesPayload: BranchesHostServiceCreate = {
        accountId,
        name,
        description,
        businessLicense,
        closingHours,
        openingHours,
        email,
        image,
        isAccept: false,
        phone,
        orderId: null,
        isPayment: true,
      };

      const addressPayload: AddressBranchHostServiceCreate = {
        detail,
        districts,
        latitude,
        longitude,
        provinces,
        wards,
      };

      const branches: Branches = await branchesHostService.create(
        branchesPayload,
        addressPayload,
        attributeBranches,
        court
      );
      ResponseHandler(res, branches);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên cơ sở đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  updateInformation: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const {
        name,
        description,
        closingHours,
        openingHours,
        email,
        image,
        phone,
        attributeBranches,
        court,
      } = req.body;

      const branchesPayload: Prisma.BranchesUpdateInput = {
        name,
        description,
        closingHours,
        openingHours,
        email,
        image,
        phone,
      };

      const branches: Branches = await branchesHostService.update(
        id,
        branchesPayload,
        attributeBranches,
        court
      );
      ResponseHandler(res, branches);
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên cơ sở đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await branchesHostService.delete(Number(id));
      console.log('🚀 ========= result:', result);
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesHostController;
