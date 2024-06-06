import { PrismaClient } from '@prisma/client';

let database: PrismaClient = new PrismaClient();

export default database;
