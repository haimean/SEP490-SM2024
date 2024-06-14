import database from '../lib/db.server';
import { Account } from '@prisma/client';

const accountServiceBase = {
  findById: async (id: number) => {
    return await database.account.findFirst({
      where: { id },
      include: { user: true },
    });
  },
  update: async (id: number, data: Account) => {
    return await database.account.update({
      where: { id },
      data,
    });
  },
};
export default accountServiceBase;
