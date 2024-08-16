import { AttributeCourt, AttributeKeyCourt } from '@prisma/client';

import database from '../../../lib/db.server';
import attributeCourtService from './attributeCourt.service';

jest.mock('../../../lib/db.server', () => ({
  attributeCourt: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
  attributeKeyCourt: {
    findFirst: jest.fn(),
  },
}));

describe('attributeCourtService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new attribute court', async () => {
      const mockPayload: AttributeCourt = {
        id: 1,
        value: 'test value',
        isPublic: true,
        accountId: 1,
        attributeKeyCourtId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockResult = { ...mockPayload, id: 2 };

      (database.attributeCourt.create as jest.Mock).mockResolvedValue(
        mockResult
      );

      const result = await attributeCourtService.create(mockPayload);

      expect(database.attributeCourt.create).toHaveBeenCalledWith({
        data: {
          value: 'test value',
          isPublic: true,
          accountId: 1,
          attributeKeyCourtId: 1,
          isActive: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should update an attribute court', async () => {
      const mockPayload: AttributeCourt = {
        id: 1,
        value: 'updated value',
        isPublic: false,
        accountId: 1,
        attributeKeyCourtId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockResult = { ...mockPayload };

      (database.attributeCourt.update as jest.Mock).mockResolvedValue(
        mockResult
      );

      const result = await attributeCourtService.update(mockPayload);

      expect(database.attributeCourt.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          value: 'updated value',
          isPublic: false,
          accountId: 1,
          attributeKeyCourtId: 1,
          isActive: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should delete an attribute court by id', async () => {
      const mockResult = { id: 1 };

      (database.attributeCourt.delete as jest.Mock).mockResolvedValue(
        mockResult
      );

      const result = await attributeCourtService.remove(1);

      expect(database.attributeCourt.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all attribute courts', async () => {
      const mockResult = [
        {
          id: 1,
          value: 'test value',
          isPublic: true,
          accountId: 1,
          attributeKeyCourtId: 1,
          isActive: true,
          account: {},
          attributeKeyCourt: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (
        database.attributeCourt.findMany as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeCourtService.getAll();

      expect(database.attributeCourt.findMany).toHaveBeenCalledWith({
        include: {
          account: true,
          attributeKeyCourt: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('get', () => {
    it('should return an attribute court by id', async () => {
      const mockResult = {
        id: 1,
        value: 'test value',
        isPublic: true,
        accountId: 1,
        attributeKeyCourtId: 1,
        isActive: true,
        account: {},
        attributeKeyCourt: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (
        database.attributeCourt.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeCourtService.get(1);

      expect(database.attributeCourt.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          account: true,
          attributeKeyCourt: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAttributeKeyCourt', () => {
    it('should find an attribute key court by id', async () => {
      const mockResult: AttributeKeyCourt = {
        id: 1,
        name: 'test key',
        description: 'test description',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (
        database.attributeKeyCourt.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result =
        await attributeCourtService.findAttributeKeyCourt(1);

      expect(
        database.attributeKeyCourt.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });
});
