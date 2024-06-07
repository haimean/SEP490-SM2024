import { Response } from 'express';
import { logger } from '../utils/logger';

const ResponseHandler = (res: Response, data: object | string) => {
  logger.info('Response', data);
  res.status(200).json({ status: 'success', data: data });
};
export default ResponseHandler;
