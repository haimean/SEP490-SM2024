import { NextFunction, Response } from 'express';
import database from './../../../../lib/db.server';
import NotFoundError from './../../../../outcomes/notFoundError';

const attributeKeyCourtMiddleware = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const existingRecord =
      await database.attributeKeyBranches.findFirst({
        where: {
          description: null,
        },
      });

    if (!existingRecord) {
      next();
    } else {
      next(new NotFoundError(messages));
    }
  },
};

export default attributeKeyCourtMiddleware;
