import express, { Application } from 'express';
import { logger } from './src/utils/logger';
import Server from './src/server';

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
