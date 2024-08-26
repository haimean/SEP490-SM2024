import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Role } from '@prisma/client';

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
  numberPhone: string;
  name: string;
}
interface LoginGoogle {
  email: string;
  role: Role;
  name: string;
}
const authService = {
  login: async ({ email, password }: LoginParams) => {
    const existingUser = await database.account.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      throw new Error('Tài khoản không tại');
    }
    const isVerify = existingUser.isVerified;
    const isBan = existingUser.isActive;
    if (!isVerify) {
      throw new Error('Tài khoản chưa xác minh');
    }
    if (!isBan) {
      throw new Error('Tài khoản bị cấm');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error('Mật khẩu không đúng');
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
  },

  register: async ({
    email,
    password,
    role,
    name,
    numberPhone,
  }: Register) => {
    let account = await database.account.findUnique({
      where: { email },
    });
    if (account) {
      throw new Error('Tài khoản tồn tại');
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
          fullName: name,
          gender: 'OTHER',
          numberPhone,
        },
      });
      return account;
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
          dob: null,
          numberPhone: '',
          fullName: name,
          gender: 'FEMALE',
          identifierCode: '',
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
  },
};
export default authService;
