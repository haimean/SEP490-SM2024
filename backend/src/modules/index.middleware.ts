/* eslint-disable no-undef */
import jwt, { Secret } from 'jsonwebtoken';
import CustomError from '../outcomes/customError';
import { NextFunction, Request, Response } from 'express';
import { Account, Role } from '@prisma/client';
import accountServiceBase from '../baseService/accountServiceBase';

const secret: Secret = process.env.SECRET_JWT_KEY ?? '';

const verifyToken = async (
  req: Request,
  next: NextFunction,
  role: string
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1] ?? '';
    const jwtObj: { data: Account } = jwt.verify(token, secret) as {
      data: Account;
    };

    if (jwtObj.data.id) {
      const account = await accountServiceBase.findById(
        jwtObj.data.id
      );
      if (account) {
        if (account.role === role) {
          return next();
        } else {
          return next(new CustomError('Authorization', 401));
        }
      }
    }
    return next(new CustomError('Authentication', 401));
  } catch (e: unknown) {
    if (typeof e === 'string') {
      return next(new CustomError(e.toUpperCase(), 500));
    } else if (e instanceof Error) {
      return next(new CustomError(e.message, 500));
    }
  }
};

const middleware = {
  auth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(' ')[1] ?? '';
      const jwtObj: { data: Account } = jwt.verify(token, secret) as {
        data: Account;
      };

      if (jwtObj.data.id) {
        const account = await accountServiceBase.findById(
          jwtObj.data.id
        );
        if (account) {
          return next();
        }
      }
      return next(new CustomError('Authentication', 401));
    } catch (e: unknown) {
      if (typeof e === 'string') {
        return next(new CustomError(e.toUpperCase(), 500));
      } else if (e instanceof Error) {
        return next(new CustomError(e.message, 500));
      }
    }
  },
  admin: (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, next, Role.ADMIN),
  host: (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, next, Role.HOST),
  player: (req: Request, res: Response, next: NextFunction) =>
    verifyToken(req, next, Role.USER),
};

export default middleware;
