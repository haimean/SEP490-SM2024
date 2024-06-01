import { PrismaClient } from '@prisma/client';

let database: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

database = global.__db;

export { database };
