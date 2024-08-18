import database from '../../../../lib/db.server';
import {
  AttributeKeyBranchesPayLoad,
  AttributeKeyBranchesUpdatePayLoad,
} from './attributeKeyBranches.model';
import attributeKeyBranchesService from './attributeKeyBranches.service';

jest.mock('../../../../lib/db.server', () => ({
  attributeKeyBranches: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
}));

describe('attributeKeyBranchesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new attribute key branch', async () => {
      const mockPayload: AttributeKeyBranchesPayLoad = {
        name: 'Test Key Branch',
        description: 'Test Description',
      };

      const mockResult = { id: 1, ...mockPayload };

      (
        database.attributeKeyBranches.create as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyBranchesService.create(
        mockPayload
      );

      expect(
        database.attributeKeyBranches.create
      ).toHaveBeenCalledWith({
        data: mockPayload,
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should update an attribute key branch by id', async () => {
      const mockPayload: AttributeKeyBranchesUpdatePayLoad = {
        name: 'Updated Key Branch',
        description: 'Updated Description',
        isActive: false,
      };

      const mockResult = { id: 1, ...mockPayload };

      (
        database.attributeKeyBranches.update as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyBranchesService.update(
        1,
        mockPayload
      );

      expect(
        database.attributeKeyBranches.update
      ).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockPayload,
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should delete an attribute key branch by id', async () => {
      const mockResult = { id: 1 };

      (
        database.attributeKeyBranches.delete as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyBranchesService.remove(1);

      expect(
        database.attributeKeyBranches.delete
      ).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all attribute key branches', async () => {
      const mockResult = [
        {
          id: 1,
          name: 'Key Branch 1',
          description: 'Description 1',
          isActive: true,
          attributeBranches: [],
        },
        {
          id: 2,
          name: 'Key Branch 2',
          description: 'Description 2',
          isActive: false,
          attributeBranches: [],
        },
      ];

      (
        database.attributeKeyBranches.findMany as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyBranchesService.getAll();

      expect(
        database.attributeKeyBranches.findMany
      ).toHaveBeenCalledWith({
        include: {
          attributeBranches: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('get', () => {
    it('should return an attribute key branch by id', async () => {
      const mockResult = {
        id: 1,
        name: 'Key Branch 1',
        description: 'Description 1',
        isActive: true,
        attributeBranches: [],
      };

      (
        database.attributeKeyBranches.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyBranchesService.get(1);

      expect(
        database.attributeKeyBranches.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          attributeBranches: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });
});
