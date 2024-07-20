import { PrismaClient } from '@prisma/client';
import dateTimeMiddleware from '../utils/prisma-middleware';

const database: PrismaClient = new PrismaClient();
database.$use(dateTimeMiddleware);
export default database;
