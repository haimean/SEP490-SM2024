/* eslint-disable no-undef */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import CustomError from '../outcomes/customError';
import { NextFunction, Request, Response } from 'express';

const middlewares = {
  admin: (req: Request, res: Response, next: NextFunction) => {
    try {
      const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
      // Lấy token từ request gửi đến
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: JwtPayload = jwt.verify(
        token,
        secret
      ) as JwtPayload;
      // Check role
      // TODO: check role
      // if (jwtObj.role !== 'admin') {
      //   next(new CustomError('Authorization', 401));
      // }

      if (Date.now() > (jwtObj?.exp || 0) * 1000) {
        next(new CustomError('Token is expired', 400));
      }
      next();
    } catch (e: unknown) {
      if (typeof e === 'string') {
        next(new CustomError(e.toUpperCase(), 500));
      } else if (e instanceof Error) {
        next(new CustomError(e.message, 500));
      }
    }
  },

  host: (req: Request, res: Response, next: NextFunction) => {
    //TODO: middlewate for host
    next();
  },
  player: (req: Request, res: Response, next: NextFunction) => {
    //TODO: middlewate for player
    next();
  },
};

export default middlewares;
