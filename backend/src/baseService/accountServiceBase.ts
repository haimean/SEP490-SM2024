import database from '../lib/db.server';
import { Account } from '@prisma/client';

const accountServiceBase = {
  findById: async (id: number): Promise<Account | null> => {
    return await database.account.findUnique({
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
  updatePass: async (id: number, password: string) => {
    return await database.account.update({
      where: { id },
      data: {
        password,
      },
    });
  },
};
export default accountServiceBase;
