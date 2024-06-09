import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import database from '../../lib/db.server';

dotenv.config();
interface LoginParams {
  loginType: string;
  email: string;
  password: string;
}
interface Register {
  email: string;
  password: string;
  role: Role;
}

const authService = {
  login: async ({ loginType, email, password }: LoginParams) => {
    try {
      const existingUser = await database.account.findUnique({
        where: {
          email,
        },
      });
      if (!existingUser) {
        throw new Error('Account does not exist');
      }
      if (loginType === 'Normal') {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isPasswordValid) {
          throw new Error('Password not correct');
        }
      }

      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.SECRET_JWT_KEY as string,
        {
          expiresIn: '1d',
        }
      );

      return {
        ...existingUser,
        password: 'Not show',
        token: token,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  },

  register: async ({ email, password, role }: Register) => {
    try {
      let account = await database.account.findUnique({
        where: { email },
      });
      if (account) {
        throw new Error('Account exist');
      } else {
        const hashPassword = await bcrypt.hash(
          password,
          Number(process.env.SECRET_KEY as string)
        );

        account = await database.account.create({
          data: {
            email,
            password: hashPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            role,
          },
        });
        return account;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  findEmail: async (emailToken: string) => {
    const account = await database.account.findFirst({
      where: { emailToken },
    });
    if (account) {
      await database.account.update({
        where: {
          email: account.email,
        },
        data: {
          emailToken: null,
          isVerified: true,
        },
      });
      return {
        id: account.id,
        email: account.email,
        isVerified: account?.isVerified,
      };
    }
  },
};
export default authService;
