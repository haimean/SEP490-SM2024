import { PrismaClient } from '@prisma/client';

const database: PrismaClient = new PrismaClient();
export default database;
