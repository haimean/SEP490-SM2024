import jwt from 'jsonwebtoken';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt, { hashSync } from 'bcrypt';
const prisma = new PrismaClient();

interface LoginParams {
  loginType: string;
  email: string;
  password: string;
}
interface Register {
  email: string;
  password: string;
}
declare var process: {
  env: {
    SECRET_KEY: string;
    SECRET_KEY_JWT: string;
  };
};
const authService = {
  login: async ({ loginType, email, password }: LoginParams) => {
    try {
      const existingUser = await prisma.user.findUnique({
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

  register: async ({ email, password }: Register) => {
    try {
      let user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        throw new Error('Account exist');
      } else {
        const hashPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SECRET_KEY)
        );
        user = await prisma.user.create({
          data: {
            email,
            password: hashPassword,
          },
        });
        return user;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default authService;
