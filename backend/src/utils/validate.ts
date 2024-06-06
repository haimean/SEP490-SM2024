import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import CustomError from '../outcomes/customError';

const validate = (schema: ObjectSchema) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validated = await schema.validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
      //* Pass err to next
      // If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (typeof err === 'object' && err?.isJoi) {
        next(new CustomError(err.message, 422));
      }
      next(new CustomError(err.message, 400));
    }
  };
};

export default validate;
