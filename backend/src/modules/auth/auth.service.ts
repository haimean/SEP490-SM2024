import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import database from '../../lib/db.server';
import { Role } from '@prisma/client';
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
interface VerifyEmail {
  emailToken: string | undefined;
}
declare var process: {
  env: {
    SECRET_KEY: string;
    SECRET_KEY_JWT: string;
    DATABASE_URL: string;
  };
};
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
        process.env.SECRET_KEY_JWT,
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
          parseInt(process.env.SECRET_KEY)
        );
        // Convert role from string to Role enum
        // const enumRole = Role[role as keyof typeof Role];

        // if (!enumRole) {
        //   throw new Error('Invalid role');
        // }
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
  findEmail: async ({ emailToken }: VerifyEmail) => {
    console.log('🚀 ========= emailToken:', emailToken);
    const account = await database.account.findFirst({
      where: { emailToken },
    });
    // console.log('🚀 ========= account:', account);
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
      const token = createToken(account.id);
      return {
        id: account.id,
        email: account.email,
        token,
        isVerified: account?.isVerified,
      };
    } else {
      throw new Error('Email verification failed, invalid token');
    }
  },
};
const createToken = (id: Number) => {
  const jwtSecretKey = process.env.SECRET_KEY_JWT;
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: '3d' });
};
export default authService;
