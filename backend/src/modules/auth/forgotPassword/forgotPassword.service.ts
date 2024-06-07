import database from '../../../lib/db.server';
import { Account } from '@prisma/client';

const forgotPasswordService = {
  findEmail: async (email: string): Promise<Account | null> => {
    return await database.account.findFirst({
      where: {
        email: email,
      },
    });
  },
  updateOtp: async (
    email: string,
    otp: string
  ): Promise<Account | null> => {
    return await database.account.update({
      where: {
        email: email,
      },
      data: { otp },
    });
  },
};
export default forgotPasswordService;
