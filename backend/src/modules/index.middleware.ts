/* eslint-disable no-undef */
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import CustomError from '../outcomes/customError';
import { NextFunction, Request, Response } from 'express';
import { Account } from '@prisma/client';
import accountServiceBase from '../baseService/accountServiceBase';

const middlewares = {
  auth: (req: Request, res: Response, next: NextFunction) => {
    try {
      const secret: Secret = process.env.SECRET_JWT_KEY ?? '';
      // Lấy token từ request gửi đến
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: Account = jwt.verify(token, secret) as Account;
      if (jwtObj.id) {
        const account = accountServiceBase.findById(jwtObj.id);
        if (account) {
          req.body.account = account;
          next();
        }
      } else {
        next(new CustomError('Authentication', 401));
      }
    } catch (e: unknown) {
      if (typeof e === 'string') {
        next(new CustomError(e.toUpperCase(), 500));
      } else if (e instanceof Error) {
        next(new CustomError(e.message, 500));
      }
    }
  },
  admin: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.account.role !== 'ADMIN') {
      next(new CustomError('Authorization', 401));
    } else {
      next();
    }
  },

  host: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.account.role !== 'HOST') {
      next(new CustomError('Authorization', 401));
    } else {
      next();
    }
  },
  player: (req: Request, res: Response, next: NextFunction) => {
    if (req.body.account.role !== 'USER') {
      next(new CustomError('Authorization', 401));
    } else {
      next();
    }
  },
};

export default middlewares;
