import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import database from '../../lib/db.server';

dotenv.config();
interface LoginParams {
  email: string;
  password: string;
}
interface Register {
  email: string;
  password: string;
  role: Role;
  name: string;
}
interface LoginGoogle {
  email: string;
  role: Role;
  name: string;
}
const authService = {
  login: async ({ email, password }: LoginParams) => {
    try {
      const existingUser = await database.account.findUnique({
        where: {
          email,
        },
      });
      if (!existingUser) {
        throw new Error('Account does not exist');
      }
      const isVerify = existingUser.isVerified;
      const isBan = existingUser.isActive;
      if (!isVerify) {
        throw new Error('Not verify');
      }
      if (!isBan) {
        throw new Error('Ban account');
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
      console.log('isPasswordValid: ', isPasswordValid);

      if (!isPasswordValid) {
        throw new Error('Password not correct');
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

  register: async ({ email, password, role, name }: Register) => {
    try {
      let account = await database.account.findUnique({
        where: { email },
      });
      if (account) {
        throw new Error('Account exist');
      } else {
        const hashPassword = await bcrypt.hash(
          password,
          Number(process.env.SECRET_JWT_KEY as string)
        );

        account = await database.account.create({
          data: {
            email,
            password: hashPassword,
            emailToken: crypto.randomBytes(64).toString('hex'),
            role,
          },
        });
        await database.user.create({
          data: {
            accountId: account.id,
            name,
            dob: null,
            numberPhone: '',
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
  loginGoogle: async ({ email, role, name }: LoginGoogle) => {
    try {
      let account = await database.account.findUnique({
        where: { email },
      });
      if (account) {
        const token = jwt.sign(
          {
            data: account,
          },
          process.env.SECRET_JWT_KEY as string,
          {
            expiresIn: '1d',
          }
        );
        return {
          ...account,
          token: token,
        };
      } else {
        account = await database.account.create({
          data: {
            email,
            password: '',
            emailToken: '',
            isVerified: true,
            role,
          },
        });
        await database.user.create({
          data: {
            accountId: account.id,
            name,
            dob: null,
            numberPhone: '',
          },
        });
        const token = jwt.sign(
          {
            data: account,
          },
          process.env.SECRET_JWT_KEY as string,
          {
            expiresIn: '1d',
          }
        );
        return {
          ...account,
          token: token,
        };
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
export default authService;
