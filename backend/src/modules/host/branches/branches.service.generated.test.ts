import database from '../../../lib/db.server';
import { BranchesHostServiceCreate } from './branches.model';
import branchesHostService from './branches.service';

jest.mock('../../../lib/db.server', () => ({
  branches: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  booking: {
    findMany: jest.fn(),
  },
}));

describe('branchesHostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listBranch', () => {
    it('should return all branches for an account that are not deleted', async () => {
      const mockBranches = [{ id: 1, accountId: 1, isDelete: false }];

      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesHostService.listBranch(1);

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: { accountId: 1, isDelete: false },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBranches);
    });
  });

  describe('totalBranch', () => {
    it('should return the total number of branches for an account that are not deleted', async () => {
      const mockBranches = [{ id: 1, accountId: 1, isDelete: false }];

      (database.branches.findMany as jest.Mock).mockResolvedValue(
        mockBranches
      );

      const result = await branchesHostService.totalBranch(1);

      expect(database.branches.findMany).toHaveBeenCalledWith({
        where: { accountId: 1, isDelete: false },
      });
      expect(result).toEqual({ total: mockBranches.length });
    });
  });

  describe('get', () => {
    it('should return a branch with the given accountId and id', async () => {
      const mockBranch = {
        id: 1,
        accountId: 1,
        isAccept: true,
        isDelete: false,
      };

      (database.branches.findUnique as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesHostService.get(1, 1);

      expect(database.branches.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
          accountId: 1,
          isAccept: true,
          isDelete: false,
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBranch);
    });
  });

  describe('create', () => {
    it('should create a new branch with the provided payload', async () => {
      const branchesPayload: BranchesHostServiceCreate = {
        accountId: 1,
        name: 'Branch 1',
        businessLicense: '123456',
        closingHours: '22:00',
        openingHours: '08:00',
        phone: '123456789',
        image: 'image-url',
        email: 'branch@example.com',
        description: 'A branch',
        isAccept: false,
        isPayment: true,
        orderId: null,
      };

      const addressPayload = {
        longitude: '123.45',
        latitude: '67.89',
        provinces: 'Province',
        districts: 'District',
        wards: 'Ward',
        detail: 'Detail',
      };

      const attributeBranches = [1, 2];
      const court = [1, 2];

      const mockBranch = { id: 1, ...branchesPayload };

      (database.branches.create as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesHostService.create(
        branchesPayload,
        addressPayload,
        attributeBranches,
        court
      );

      expect(result).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update an existing branch with the provided payload', async () => {
      const branchesPayload = {
        name: 'Updated Branch',
        businessLicense: '654321',
        closingHours: '20:00',
        openingHours: '09:00',
        phone: '987654321',
        image: 'new-image-url',
        email: 'updated@example.com',
        description: 'An updated branch',
      };

      const attributeBranches = [1, 2];
      const court = [3, 4];

      const mockBranch = { id: 1, ...branchesPayload };

      (database.branches.update as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesHostService.update(
        1,
        branchesPayload,
        attributeBranches,
        court
      );

      expect(result).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should mark a branch as deleted', async () => {
      const mockBranch = { id: 1, isDelete: true };

      (database.branches.update as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await branchesHostService.delete(1);

      expect(database.branches.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isDelete: true },
      });
      expect(result).toEqual(mockBranch);
    });
  });

  describe('getBookingNotStart', () => {
    it('should return all bookings for a branch that have not started yet', async () => {
      const mockBookings = [
        {
          startTime: new Date('2023-08-01T10:00:00Z'),
          endTime: new Date('2023-08-01T12:00:00Z'),
        },
      ];

      (database.booking.findMany as jest.Mock).mockResolvedValue(
        mockBookings
      );

      const result = await branchesHostService.getBookingNotStart(1);

      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          Court: { Branches: { id: 1 } },
          startTime: { gte: expect.any(Date) },
        },
        select: { startTime: true, endTime: true },
      });
      expect(result).toEqual(mockBookings);
    });
  });
});
