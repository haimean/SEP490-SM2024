import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import branchesAdminService from './branches.service';

jest.mock('../../../lib/db.server', () => ({
  branches: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('branchesAdminService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all branches that are not accepted and not deleted', async () => {
      const mockBranches = [
        { id: 1, isAccept: false, isDelete: false },
      ];
      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesAdminService.getAll();

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
          isAccept: false,
          isDelete: false,
        },
        include: {
          account: {
            include: {
              user: true,
            },
          },
          address: true,
        },
      });
      expect(result).toEqual(mockBranches);
    });
  });

  describe('get', () => {
    it('should return a specific branch by id that is accepted and not deleted', async () => {
      const mockBranch = { id: 1, isAccept: true, isDelete: false };
      (database.branches.findUnique as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesAdminService.get(1);

      expect(database.branches.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
          isAccept: true,
          isDelete: false,
        },
        include: {
          address: true,
          court: { include: { TypeCourt: true } },
          attributeBranches: {
            include: {
              attributeKeyBranches: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBranch);
    });
  });

  describe('getDefault', () => {
    it('should return a specific branch by id that is not deleted', async () => {
      const mockBranch = { id: 1, isDelete: false };
      (database.branches.findUnique as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesAdminService.getDefault(1);

      expect(database.branches.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
          isDelete: false,
        },
      });
      expect(result).toEqual(mockBranch);
    });
  });

  describe('setAccept', () => {
    it('should update a branch acceptance status by id', async () => {
      const mockBranch = { id: 1, isAccept: true };
      (database.branches.update as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesAdminService.setAccept(1, true);

      expect(database.branches.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isAccept: true },
        include: {
          address: true,
          court: { include: { TypeCourt: true } },
          attributeBranches: {
            include: {
              attributeKeyBranches: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBranch);
    });
  });

  describe('getAllWithAccount', () => {
    it('should return paginated branches that are accepted and not deleted with total count', async () => {
      const mockBranches = [
        { id: 1, isAccept: true, isDelete: false },
      ];
      const pagination: Pagination = { page: 1, perPage: 10 };
      (database.branches.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBranches)
        .mockResolvedValueOnce(mockBranches);

      const result = await branchesAdminService.getAllWithAccount(
        pagination
      );

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
          isAccept: true,
          isDelete: false,
        },
        include: {
          account: {
            include: {
              user: true,
            },
          },
          address: true,
        },
        orderBy: {
          accountId: 'asc',
        },
      });
      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
          isAccept: true,
          isDelete: false,
        },
        include: {
          account: {
            include: {
              user: true,
            },
          },
          address: true,
        },
        orderBy: {
          accountId: 'asc',
        },
        ...getQueryPagination(pagination),
      });
      expect(result).toEqual({
        data: mockBranches,
        total: mockBranches.length,
      });
    });
  });
});
