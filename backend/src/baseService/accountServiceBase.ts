import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import database from '../lib/db.server';

const accountServiceBase = {
  findById: async (id: number) => {
    return await database.user.findFirst({ where: { id } });
  },
};
export default accountServiceBase;
