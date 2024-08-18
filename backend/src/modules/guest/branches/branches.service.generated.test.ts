import database from '../../../lib/db.server';
import { getQueryPagination } from '../../index.service';
import branchesGuestService from './branches.service';

jest.mock('../../../lib/db.server', () => ({
  branches: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('branchesGuestService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all accepted and non-deleted branches', async () => {
      const mockBranches = [
        { id: 1, isAccept: true, isDelete: false },
      ];
      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesGuestService.getAll();

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
          isAccept: true,
          isDelete: false,
        },
        include: {
          address: true,
          account: {
            include: {
              user: true,
            },
          },
          court: { include: { TypeCourt: true } },
          attributeBranches: {
            include: {
              attributeKeyBranches: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBranches);
    });
  });

  describe('getTopThree', () => {
    it('should return the top three branches ordered by creation date', async () => {
      const mockBranches = [
        { id: 1, isAccept: true, isDelete: false },
      ];
      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesGuestService.getTopThree();

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: {
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
        orderBy: {
          createdAt: 'desc',
        },
        ...getQueryPagination({
          page: 1,
          perPage: 3,
        }),
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

      const result = await branchesGuestService.get(1);

      expect(database.branches.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
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
});
