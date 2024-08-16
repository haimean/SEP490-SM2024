import { AttributeBranches } from '@prisma/client';

import database from '../../../lib/db.server';
import attributeBranchesService from './attributeBranches.service';

// Mock cụ thể các phương thức của Prisma Client
jest.mock('../../../lib/db.server', () => {
  return {
    attributeBranches: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    attributeKeyBranches: {
      findFirst: jest.fn(),
    },
  };
});

describe('attributeBranchesService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new attribute branch', async () => {
      const mockPayload: AttributeBranches = {
        id: 1,
        value: 'test value',
        isPublic: true,
        accountId: 1,
        attributeKeyBranchesId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockResult = { ...mockPayload, id: 2 };

      (
        database.attributeBranches.create as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeBranchesService.create(
        mockPayload
      );

      expect(database.attributeBranches.create).toHaveBeenCalledWith({
        data: {
          value: 'test value',
          isPublic: true,
          accountId: 1,
          attributeKeyBranchesId: 1,
          isActive: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should update an attribute branch', async () => {
      const mockPayload: AttributeBranches = {
        id: 1,
        value: 'updated value',
        isPublic: false,
        accountId: 1,
        attributeKeyBranchesId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockResult = { ...mockPayload };

      (
        database.attributeBranches.update as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeBranchesService.update(
        mockPayload
      );

      expect(database.attributeBranches.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          value: 'updated value',
          isPublic: false,
          accountId: 1,
          attributeKeyBranchesId: 1,
          isActive: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should delete an attribute branch by id', async () => {
      const mockResult = { id: 1 };

      (
        database.attributeBranches.delete as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeBranchesService.remove(1);

      expect(database.attributeBranches.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all attribute branches', async () => {
      const mockResult = [
        {
          id: 1,
          value: 'test value',
          isPublic: true,
          accountId: 1,
          attributeKeyBranchesId: 1,
          isActive: true,
          account: {},
          attributeKeyBranches: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (
        database.attributeBranches.findMany as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeBranchesService.getAll();

      expect(
        database.attributeBranches.findMany
      ).toHaveBeenCalledWith({
        include: {
          account: true,
          attributeKeyBranches: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('get', () => {
    it('should return an attribute branch by id', async () => {
      const mockResult = {
        id: 1,
        value: 'test value',
        isPublic: true,
        accountId: 1,
        attributeKeyBranchesId: 1,
        isActive: true,
        account: {},
        attributeKeyBranches: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (
        database.attributeBranches.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeBranchesService.get(1);

      expect(
        database.attributeBranches.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          account: true,
          attributeKeyBranches: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAttributeKeyBranches', () => {
    it('should find an attribute key branch by id', async () => {
      const mockResult = {
        id: 1,
        name: 'test key',
        description: 'test description',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (
        database.attributeKeyBranches.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result =
        await attributeBranchesService.findAttributeKeyBranches(1);

      expect(
        database.attributeKeyBranches.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });
});
