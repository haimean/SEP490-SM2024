import express, { Application } from 'express';
import Server from './src/index';
import { logger } from './src/utils/logger';

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 8080;

app
  .listen(PORT, 'localhost', function () {
    logger.info(
      `Express server is listening at http://localhost:${PORT} 🚀`
    );
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      logger.error('Error: address already in use');
    } else {
      logger.error(err);
    }
  });
