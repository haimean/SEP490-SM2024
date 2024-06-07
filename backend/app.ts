import express, { Application } from 'express';
import { logger } from './src/utils/logger';
import cors, { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import routes from './src/modules/index.router';
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger-output.json';

configDotenv();
const PORT: number = Number(process.env.PORT ?? '8080');

const corsOptions: CorsOptions = {
  origin: process.env.FONT_END_URL ?? '3000',
};

const app: Application = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routes);
// Sử dụng middleware Swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app
  .listen(PORT, async function () {
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
