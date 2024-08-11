import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import CustomError from '../../../outcomes/customError';
interface TypeCourtHostMiddleware {
  isBeforeCreate: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

const typeCourtHostMiddleware: TypeCourtHostMiddleware = {
  isBeforeCreate: async (req, res, next) => {
    try {
      const { attributeCourtIds, priceTypeCourt } = req.body;
      if (typeof attributeCourtIds === 'string') {
        req.body.attributeCourtIds = [attributeCourtIds];
      }

      if (typeof priceTypeCourt === 'string') {
        req.body.priceTypeCourt = [JSON.parse(priceTypeCourt)];
      } else {
        req.body.priceTypeCourt = priceTypeCourt.map((item: string) =>
          JSON.parse(item)
        );
      }

      next();
    } catch (error: any) {
      next(new CustomError(error?.message, 500));
    }
  },
};

export default typeCourtHostMiddleware;
