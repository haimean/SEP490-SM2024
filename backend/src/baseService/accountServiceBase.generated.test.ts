import { Account } from '@prisma/client';

import database from '../lib/db.server';
import accountServiceBase from './accountServiceBase';

jest.mock('../lib/db.server', () => ({
  account: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('accountServiceBase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return an account by id with user included', async () => {
      const mockAccount: Account = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER',
        otp: null,
        otpExpired: null,
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailToken: '',
      };

      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await accountServiceBase.findById(1);

      expect(database.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { user: true },
      });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('update', () => {
    it('should update an account by id', async () => {
      const mockAccount: Account = {
        id: 1,
        email: 'updated@example.com',
        password: 'newhashedpassword',
        role: 'USER',
        otp: null,
        otpExpired: null,
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailToken: '',
      };

      (database.account.update as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await accountServiceBase.update(1, mockAccount);

      expect(database.account.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockAccount,
      });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('updatePass', () => {
    it('should update the password of an account by id', async () => {
      const mockAccount: Account = {
        id: 1,
        email: 'test@example.com',
        password: 'newhashedpassword',
        role: 'USER',
        otp: null,
        otpExpired: null,
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailToken: '',
      };

      (database.account.update as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await accountServiceBase.updatePass(
        1,
        'newhashedpassword'
      );

      expect(database.account.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { password: 'newhashedpassword' },
      });
      expect(result).toEqual(mockAccount);
    });
  });
});
