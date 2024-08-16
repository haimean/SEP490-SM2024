import database from '../../../lib/db.server';
import dateUtils from '../../../utils/date';
import accountService from './account.service';

jest.mock('../../../lib/db.server', () => ({
  __esModule: true,
  default: {
    user: {
      findMany: jest.fn(), // Mock findMany cho user
    },
    account: {
      findUnique: jest.fn(), // Mock findUnique cho account
      update: jest.fn(), // Mock update cho account
      findMany: jest.fn(), // Mock findMany cho account
    },
  },
}));
jest.mock('../../../utils/date');

describe('accountService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listAccount', () => {
    it('should return the list of accounts with totalCount', async () => {
      const mockAccounts = [
        { id: 1, name: 'John Doe', isVerified: true },
        { id: 2, name: 'Jane Doe', isVerified: false },
      ];

      (database.user.findMany as jest.Mock).mockResolvedValue(
        mockAccounts
      );

      const pagination = { page: 1, perPage: 10 };
      const result = await accountService.listAccount(
        'asc',
        'true',
        'asc',
        pagination
      );

      expect(database.user.findMany).toHaveBeenCalled();
      expect(result.result).toEqual(mockAccounts);
      expect(result.totalCount).toEqual(mockAccounts.length);
    });
  });

  describe('banAccount', () => {
    it('should toggle the isActive status of an account', async () => {
      const mockAccount = { id: 1, isActive: true };

      (database.account.findUnique as jest.Mock).mockResolvedValue(
        mockAccount
      );
      (database.account.update as jest.Mock).mockResolvedValue({
        ...mockAccount,
        isActive: false,
      });

      const result = await accountService.banAccount(1);

      expect(database.account.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(database.account.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });

    it('should throw an error if the account does not exist', async () => {
      (database.account.findUnique as jest.Mock).mockResolvedValue(
        null
      );

      await expect(accountService.banAccount(1)).rejects.toThrow(
        'Account not exist'
      );
    });
  });

  describe('listMonthAccount', () => {
    it('should return accounts created in the current month', async () => {
      const mockAccounts = [
        { id: 1, createdAt: new Date() },
        { id: 2, createdAt: new Date() },
      ];

      (database.account.findMany as jest.Mock).mockResolvedValue(
        mockAccounts
      );

      const result = await accountService.listMonthAccount();

      expect(database.account.findMany).toHaveBeenCalledWith({
        where: {
          role: { not: 'ADMIN' },
          createdAt: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
        },
      });
      expect(result).toEqual(mockAccounts);
    });
  });

  describe('getListAccount12MonthLatest', () => {
    it('should return accounts created in the last 12 months', async () => {
      const mockDateRange = {
        gte: new Date('2023-01-01'),
        lt: new Date('2023-12-31'),
      };

      const mockAccounts = [
        { id: 1, createdAt: new Date('2023-02-01') },
        { id: 2, createdAt: new Date('2023-03-01') },
      ];

      (
        dateUtils.getDateStartAndEndOfMonth as jest.Mock
      ).mockReturnValue(mockDateRange);
      (database.account.findMany as jest.Mock).mockResolvedValue(
        mockAccounts
      );

      const result = await accountService.getListAccount12MonthLatest(
        new Date('2023-01-01'),
        'USER'
      );

      expect(
        dateUtils.getDateStartAndEndOfMonth
      ).toHaveBeenCalledWith(new Date('2023-01-01'));
      expect(database.account.findMany).toHaveBeenCalledWith({
        where: {
          role: 'USER',
          createdAt: mockDateRange,
        },
      });
      expect(result).toBeTruthy();
    });
  });
});
