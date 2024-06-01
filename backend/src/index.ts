import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import { configDotenv } from "dotenv";

export default class Server {
  constructor(app: Application) {
    this.config(app);

    configDotenv();
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000",
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
