import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import database from '../../lib/db.server';
import authService from './auth.service';

jest.mock('../../lib/db.server', () => ({
  account: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  user: {
    create: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => 'randomToken'),
  })),
}));

describe('authService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw an error if account does not exist', async () => {
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        null
      );

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow('Account does not exist');
    });

    it('should throw an error if account is not verified', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        isVerified: false,
        isActive: true,
      };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow('Not verify');
    });

    it('should throw an error if account is banned', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        isVerified: true,
        isActive: false,
      };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow('Ban account');
    });

    it('should throw an error if password is incorrect', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        isVerified: true,
        isActive: true,
      };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow('Password not correct');
    });

    it('should return an account with a token if login is successful', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        isVerified: true,
        isActive: true,
      };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        ...mockAccount,
        password: 'Not show',
        token: 'token',
      });
    });
  });

  describe('register', () => {
    it('should throw an error if account already exists', async () => {
      const mockAccount = { id: 1, email: 'test@example.com' };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'password',
          role: 'USER',
          name: 'Test User',
        })
      ).rejects.toThrow('Account exist');
    });

    it('should create a new account and user if registration is successful', async () => {
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        null
      );
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (database.account.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });
      (database.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        fullName: 'Test User',
      });

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password',
        role: 'USER',
        name: 'Test User',
      });

      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });
  });

  describe('findEmail', () => {
    it('should update account to verified if email token is found', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        isVerified: false,
      };
      (database.account.findFirst as jest.Mock).mockResolvedValue(
        mockAccount
      );
      (database.account.update as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        isVerified: true,
      });

      const result = await authService.findEmail('randomToken');

      expect(result).toBeTruthy();
    });
  });

  describe('loginGoogle', () => {
    it('should return an account with a token if Google account already exists', async () => {
      const mockAccount = {
        id: 1,
        email: 'test@example.com',
        isVerified: true,
        isActive: true,
      };
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await authService.loginGoogle({
        email: 'test@example.com',
        role: 'USER',
        name: 'Test User',
      });

      expect(result).toEqual({
        ...mockAccount,
        token: 'token',
      });
    });

    it('should create a new account and user if Google account does not exist', async () => {
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        null
      );
      (database.account.create as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });
      (database.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        fullName: 'Test User',
      });
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const result = await authService.loginGoogle({
        email: 'test@example.com',
        role: 'USER',
        name: 'Test User',
      });

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        token: 'token',
      });
    });
  });
});
