import { Response } from 'express';
import { logger } from '../utils/logger';

export const ResponseHandler = (
  res: Response,
  data: object | string
) => {
  logger.info('Response', data);
  res.status(200).json({ status: 'success', data: data });
};
export const ResponsePaginationHandler = (
  res: Response,
  data: object[],
  total: number
) => {
  logger.info('Response', data);
  res.status(200).json({ status: 'success', data, total });
};
