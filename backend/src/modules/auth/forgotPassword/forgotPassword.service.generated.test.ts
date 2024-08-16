import { Account } from '@prisma/client';

import database from '../../../lib/db.server';
import forgotPasswordService from './forgotPassword.service';

jest.mock('../../../lib/db.server', () => ({
  account: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
}));

describe('forgotPasswordService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findEmail', () => {
    it('should find an account by email', async () => {
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

      (database.account.findFirst as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await forgotPasswordService.findEmail(
        'test@example.com'
      );

      expect(database.account.findFirst).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('updateOtp', () => {
    it('should update otp and otpExpired for the given email', async () => {
      const mockAccount: Account = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        role: 'USER',
        otp: '123456',
        otpExpired: new Date(),
        isVerified: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        emailToken: '',
      };

      (database.account.update as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await forgotPasswordService.updateOtp(
        'test@example.com',
        '123456'
      );

      expect(database.account.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { otp: '123456', otpExpired: expect.any(Date) },
      });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('verifyCusses', () => {
    it('should clear otp and otpExpired for the given email', async () => {
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

      (database.account.update as jest.Mock).mockResolvedValue(
        mockAccount
      );

      const result = await forgotPasswordService.verifyCusses(
        'test@example.com'
      );

      expect(database.account.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { otp: null, otpExpired: null },
      });
      expect(result).toEqual(mockAccount);
    });
  });

  describe('updatePassword', () => {
    it('should update password for the given email', async () => {
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

      const result = await forgotPasswordService.updatePassword(
        'test@example.com',
        'newhashedpassword'
      );

      expect(database.account.update).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
        data: { password: 'newhashedpassword' },
      });
      expect(result).toEqual(mockAccount);
    });
  });
});
