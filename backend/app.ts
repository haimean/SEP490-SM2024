import express, { Application, Request, Response } from 'express';
import { logger } from './src/utils/logger';
import cors, { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import routes from './src/modules/index.router';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import * as swaggerFile from './swagger-output.json';
import database from './src/lib/db.server';
const { Server } = require('socket.io');

configDotenv();
const PORT: number = Number(process.env.PORT ?? '8080');

const corsOptions: CorsOptions = {
  origin: process.env.FONT_END_URL ?? '*',
};
const app: Application = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
app.use(cors(corsOptions));
app.use(express.json());

interface Notification {
  userId: number;
  message: string;
}
app.post(
  '/send-notification',
  async (req: Request, res: Response) => {
    const { userId, message }: Notification = req.body;

    // Lưu thông báo vào cơ sở dữ liệu
    const notification = await database.notification.create({
      data: {
        userId,
        message,
      },
    });

    // Gửi thông báo real-time tới user cụ thể
    io.to(userId.toString()).emit('notification', notification);

    res.status(200).json(notification);
  }
);

io.on('connection', (socket: any) => {
  console.log('New client connected');

  // Lắng nghe sự kiện `joinRoom` để thêm client vào phòng dựa trên userId
  socket.on('joinRoom', (userId: number) => {
    socket.join(userId.toString());
    console.log(`User with ID ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

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
