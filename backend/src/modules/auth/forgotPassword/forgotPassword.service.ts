import { Account } from '@prisma/client';
import database from '../../../lib/db.server';

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
      data: { otp, otpExpired: new Date() },
    });
  },
  verifyCusses: async (email: string): Promise<Account | null> => {
    return await database.account.update({
      where: {
        email: email,
      },
      data: { otp: null, otpExpired: null },
    });
  },
  updatePassword: async (email: string, password: string) => {
    return await database.account.update({
      where: {
        email: email,
      },
      data: { password },
    });
  },
};
export default forgotPasswordService;
