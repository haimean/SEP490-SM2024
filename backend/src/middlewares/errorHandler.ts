import { logger } from '../utils/logger';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err: any, req: any, res: any, next: any) => {
  logger.error('ERROR LOG ', new Date().toLocaleString());
  logger.warn(
    'Request:',
    JSON.stringify(req.method),
    JSON.stringify(req.originalUrl)
  );
  logger.warn('Params:', JSON.stringify(req.params));
  logger.warn('Body:', JSON.stringify(req.body));
  logger.warn('Query:', JSON.stringify(req.query));
  logger.error('Error: ', JSON.stringify(err));
  logger.error('Error stack: ', err.stack);
  logger.warn(
    '--------------------------------------------------------------------------------------'
  );

  const messageError = err.messageObject || err.message;
  // create format error response
  const error = {
    status: 'Error',
    error: messageError,
  };
  const status = err?.status || 400;
  res.status(status).json(error);
};

export default errorHandler;
