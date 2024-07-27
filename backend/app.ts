import express, { Application, Request, Response } from 'express';
import { logger } from './src/utils/logger';
import cors, { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import routes from './src/modules/index.router';
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger-output.json';
import { createNotifications } from './src/lib/notificationService';
import { Notification } from '@prisma/client';

configDotenv();
const PORT: number = Number(process.env.PORT ?? '8080');

const corsOptions: CorsOptions = {
  origin: '*',
};
const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());

app.post(
  '/send-notification',
  async (req: Request, res: Response) => {
    const notification: Notification = {
      message:
        'adsadfsdfsadfsdsadfdsfsdfsadfsadfdsafsdfsdfssdafsadfsdfsadfadsad',
      accountId: 2,
      status: 'SEED',
      url: '/',
      createdAt: new Date(),
      id: 1,
    };
    await createNotifications([notification]);
    res.status(200).json(notification);
  }
);

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
