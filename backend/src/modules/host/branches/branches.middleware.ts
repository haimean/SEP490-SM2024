import { NextFunction, Request, Response } from 'express';
import CustomError from '../../../outcomes/customError';
import attributeBranchesServiceBase from '../../../baseService/attributeBranchesServiceBase';
import NotFoundError from '../../../outcomes/notFoundError';
import { ErrorCallback } from 'typescript';
import { uploadFile } from '../../../lib/upLoadImageService';
import courtServiceBase from '../../../baseService/courtServiceBase';
import branchesHostService from './branches.service';
import dateUtils from '../../../utils/date';

interface BranchesHostMiddleware {
  create: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  update: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  isBeforeCreate: (
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
        // not active
        if (!dataAttributeBranches?.isActive) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
        if (
          accountId !== dataAttributeBranches?.accountId &&
          dataAttributeBranches?.account.role === 'HOST' &&
          !dataAttributeBranches?.isPublic
        ) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
      });
      court?.forEach(async (id: number) => {
        const dataCourt = await courtServiceBase.findById(id);
        if (!dataCourt) {
          next(new NotFoundError('Không tồn tại sân'));
        }
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
  isBeforeCreate: async (req, res, next) => {
    try {
      const { attributeBranches, court } = req.body;
      if (typeof attributeBranches === 'string') {
        req.body.attributeBranches = [attributeBranches];
      }
      if (typeof court === 'string') {
        req.body.attributeBranches = [court];
      }
      next();
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const accountId: number = Number(req.headers.authorization);
      const { attributeBranches, court, openingHours, closingHours } =
        req.body;
      attributeBranches?.forEach(async (id: number) => {
        const dataAttributeBranches =
          await attributeBranchesServiceBase.findById(id);
        if (!dataAttributeBranches?.isActive) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
        if (
          accountId !== dataAttributeBranches?.accountId &&
          dataAttributeBranches?.account.role === 'HOST' &&
          !dataAttributeBranches?.isPublic
        ) {
          next(new NotFoundError('Không tồn tại thuộc tính'));
        }
      });
      court?.forEach(async (id: number) => {
        const dataCourt = await courtServiceBase.findById(id);
        if (!dataCourt) {
          next(new NotFoundError('Không tồn tại sân'));
        }
      });
      // get booking not start
      const bookings = await branchesHostService.getBookingNotStart(
        Number(id)
      );
      for (const booking of bookings) {
        if (
          !dateUtils.areHoursWithinOpeningClosingHours(
            booking.startTime,
            booking.endTime,
            openingHours,
            closingHours
          )
        ) {
          next(
            new CustomError(
              'Trùng khung giờ với lịch sử đặt sân trước đó',
              500
            )
          );
        }
      }
      const file = req.file;
      //check file
      if (file) {
        req.body.image = await uploadFile(file);
      }
      next();
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default branchesHostMiddleware;
