import { Prisma } from '@prisma/client';

import database from '../lib/db.server';
import branchesBaseService from './branchesBaseService';

jest.mock('../lib/db.server', () => ({
  branches: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('branchesBaseService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all branches based on the given where and include conditions', async () => {
      const mockBranches = [{ id: 1, name: 'Branch 1' }];
      const where: Prisma.BranchesWhereInput = { isAccept: true };
      const include: Prisma.BranchesInclude = { address: true };

      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesBaseService.getAll(where, include);

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where,
        include,
      });
      expect(result).toEqual(mockBranches);
    });
  });

  describe('getAllPagination', () => {
    it('should return all accepted and non-deleted branches with address included', async () => {
      const mockBranches = [
        { id: 1, name: 'Branch 1', isAccept: true, isDelete: false },
      ];
      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesBaseService.getAllPagination();

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
          isAccept: true,
          isDelete: false,
        },
        include: {
          address: true,
        },
      });
      expect(result).toEqual(mockBranches);
    });
  });

  describe('get', () => {
    it('should return a branch based on the given where condition and include related data', async () => {
      const mockBranch = { id: 1, name: 'Branch 1' };
      const where: Prisma.BranchesWhereUniqueInput = { id: 1 };
      const include: Prisma.BranchesInclude = { address: true };

      (database.branches.findUnique as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesBaseService.get(where, include);

      expect(database.branches.findUnique).toHaveBeenCalledWith({
        where,
        include,
      });
      expect(result).toEqual(mockBranch);
    });
  });
});
