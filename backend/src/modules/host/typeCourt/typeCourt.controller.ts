import { NextFunction, Request, Response } from 'express';
import {
  deleteFile,
  getObjectSignedUrl,
  uploadFile,
} from '../../../lib/s3';
import CustomError from '../../../outcomes/customError';
import typeCourtHostService from './typeCourt.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import NotFoundError from '../../../outcomes/notFoundError';
import { PriceTypeCourt, TypeCourt } from '@prisma/client';

const typeCourtHostController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    let imageName: string = '';
    const file = req.file;
    //check file
    if (file) {
      imageName = await uploadFile(file);
    }

    try {
      const accountId = Number(req.headers.authorization);
      const { name, description, attributeCourtIds } = req.body;

      const typeCourt: TypeCourt = await typeCourtHostService.create({
        accountId,
        name,
        image: imageName,
        description,
        attributeCourtIds,
      });
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      if (imageName) deleteFile(imageName);
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    let imageName: string = '';
    const file = req.file;
    //check file
    if (file) {
      imageName = await uploadFile(file);
    }

    try {
      const accountId = Number(req.headers.authorization);
      const { name, description, attributeCourtIds } = req.body;
      const { id } = req.params;

      const typeCourt: TypeCourt = await typeCourtHostService.update(
        Number(id),
        {
          accountId,
          name,
          image: imageName,
          description,
          attributeCourtIds,
        }
      );
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      if (imageName) deleteFile(imageName);
      if (
        error.code === 'P2002' &&
        error.meta?.target.includes('name')
      ) {
        next(new CustomError('Tên đã tồn tại.', 409));
      }
      next(new CustomError(error?.message, 500));
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const accountId = Number(req.headers.authorization);
      const typeCourt: TypeCourt | null =
        await typeCourtHostService.get(Number(id), accountId);
      if (typeCourt) {
        if (typeCourt.image) {
          const image = getObjectSignedUrl(typeCourt.image);
          ResponseHandler(res, { ...typeCourt, image });
        } else {
          ResponseHandler(res, { ...typeCourt });
        }
      } else {
        next(new NotFoundError('Không tìm được kiểu sân.'));
      }
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = Number(req.headers.authorization);
      const typeCourts: TypeCourt[] =
        await typeCourtHostService.getAll(accountId);
      typeCourts.forEach(async (element, index) => {
        if (element.image) {
          typeCourts[index].image = await getObjectSignedUrl(
            element.image
          );
        }
      });
      ResponseHandler(res, typeCourts);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  getPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const typeCourt = await typeCourtHostService.getPrice(
        Number(id)
      );
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  createPrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { data } = req.body;

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        await typeCourtHostService.createPrice(Number(id), element);
      }
      const typeCourt = await typeCourtHostService.getPrice(
        Number(id)
      );
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  updatePrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { data } = req.body;

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        await typeCourtHostService.updatePrice(Number(id), element);
      }
      const typeCourt = await typeCourtHostService.getPrice(
        Number(id)
      );
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
  deletePrice: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { data } = req.body;

      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        await typeCourtHostService.deletePrice(Number(id), element);
      }
      const typeCourt = await typeCourtHostService.getPrice(
        Number(id)
      );
      ResponseHandler(res, typeCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },

  replaceAttributeCourt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { typeCourtId, oldAttributeCourtId, newAttributeCourtId } = req.params;

      const updatedTypeCourt = await typeCourtHostService.replaceAttributeCourt(
        Number(typeCourtId),
        Number(oldAttributeCourtId),
        Number(newAttributeCourtId)
      );

      ResponseHandler(res, updatedTypeCourt);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default typeCourtHostController;
