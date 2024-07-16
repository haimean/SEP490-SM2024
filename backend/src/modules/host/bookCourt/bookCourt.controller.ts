import { NextFunction, Request, Response } from 'express';
import bookCourtHostService from './bookCourt.service';
import { ResponseHandler } from '../../../outcomes/responseHandler';
import CustomError from '../../../outcomes/customError';

const bookCourtHostController = {
  getBookCourtList: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pagination } = req.body;
      const result = await bookCourtHostService.getBookCourtList(
        pagination
      );
      ResponseHandler(res, result);
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default bookCourtHostController;
