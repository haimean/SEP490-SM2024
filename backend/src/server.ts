import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { configDotenv } from 'dotenv';
import routes from './modules/index.router';

export default class Server {
  constructor(app: Application) {
    this.config(app);

    configDotenv();
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:3000',
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', routes);
  }
}
