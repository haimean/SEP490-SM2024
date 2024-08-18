import database from '../../../../lib/db.server';
import {
  AttributeKeyCourtPayLoad,
  AttributeKeyCourtUpdatePayLoad,
} from './attributeKeyCourt.model';
import attributeKeyCourtService from './attributeKeyCourt.service';

jest.mock('../../../../lib/db.server', () => ({
  attributeKeyCourt: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
}));

describe('attributeKeyCourtService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new attribute key court', async () => {
      const mockPayload: AttributeKeyCourtPayLoad = {
        name: 'Test Key Court',
        description: 'Test Description',
      };

      const mockResult = { id: 1, ...mockPayload };

      (
        database.attributeKeyCourt.create as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyCourtService.create(
        mockPayload
      );

      expect(database.attributeKeyCourt.create).toHaveBeenCalledWith({
        data: mockPayload,
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should update an attribute key court by id', async () => {
      const mockPayload: AttributeKeyCourtUpdatePayLoad = {
        name: 'Updated Key Court',
        description: 'Updated Description',
        isActive: false,
      };

      const mockResult = { id: 1, ...mockPayload };

      (
        database.attributeKeyCourt.update as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyCourtService.update(
        1,
        mockPayload
      );

      expect(database.attributeKeyCourt.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockPayload,
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should delete an attribute key court by id', async () => {
      const mockResult = { id: 1 };

      (
        database.attributeKeyCourt.delete as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyCourtService.remove(1);

      expect(database.attributeKeyCourt.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all attribute key courts', async () => {
      const mockResult = [
        {
          id: 1,
          name: 'Key Court 1',
          description: 'Description 1',
          isActive: true,
          attributeCourt: [],
        },
        {
          id: 2,
          name: 'Key Court 2',
          description: 'Description 2',
          isActive: false,
          attributeCourt: [],
        },
      ];

      (
        database.attributeKeyCourt.findMany as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyCourtService.getAll();

      expect(
        database.attributeKeyCourt.findMany
      ).toHaveBeenCalledWith({
        include: {
          attributeCourt: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });

  describe('get', () => {
    it('should return an attribute key court by id', async () => {
      const mockResult = {
        id: 1,
        name: 'Key Court 1',
        description: 'Description 1',
        isActive: true,
        attributeCourt: [],
      };

      (
        database.attributeKeyCourt.findFirst as jest.Mock
      ).mockResolvedValue(mockResult);

      const result = await attributeKeyCourtService.get(1);

      expect(
        database.attributeKeyCourt.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          attributeCourt: true,
        },
      });
      expect(result).toEqual(mockResult);
    });
  });
});
