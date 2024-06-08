// import { log } from 'mercedlogger';

import { Response } from 'express';

const ResponseHandler = (res: Response, data: object | string) => {
  // log.green('Response', data);
  res.status(200).json({ status: 'success', data: data });
};
export default ResponseHandler;
