import { PriceTypeCourt, TypeCourt } from '@prisma/client';

import database from '../../../lib/db.server';
import { TypeCourtHostServiceCreatePayload } from './typeCourt.model';
import typeCourtHostService from './typeCourt.service';

jest.mock('../../../lib/db.server', () => ({
  typeCourt: {
    create: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  priceTypeCourt: {
    deleteMany: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('typeCourtHostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new TypeCourt', async () => {
      const mockTypeCourt = {
        id: 1,
        name: 'Court 1',
        accountId: 1,
      } as TypeCourt;

      const createPayload: TypeCourtHostServiceCreatePayload = {
        name: 'Court 1',
        accountId: 1,
        description: 'Test Court',
        image: 'image-url',
        attributeCourtIds: [1, 2],
        priceTypeCourt: [
          {
            startTime: new Date(),
            endTime: new Date(),
            price: 100,
            times: 1,
          },
        ],
      };

      (database.typeCourt.create as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.create(createPayload);

      expect(database.typeCourt.create).toHaveBeenCalledWith({
        data: {
          accountId: 1,
          name: 'Court 1',
          description: 'Test Court',
          image: 'image-url',
          attributeCourt: {
            connect: [{ id: 1 }, { id: 2 }],
          },
          priceTypeCourt: {
            create: createPayload.priceTypeCourt,
          },
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });

  describe('update', () => {
    it('should update an existing TypeCourt', async () => {
      const mockTypeCourt = {
        id: 1,
        name: 'Updated Court',
        accountId: 1,
      } as TypeCourt;

      const updatePayload: TypeCourtHostServiceCreatePayload = {
        name: 'Updated Court',
        accountId: 1,
        description: 'Updated description',
        image: 'updated-image-url',
        attributeCourtIds: [1, 2],
        priceTypeCourt: [
          {
            startTime: new Date(),
            endTime: new Date(),
            price: 150,
            times: 2,
          },
        ],
      };

      (database.typeCourt.update as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.update(
        1,
        updatePayload
      );

      expect(database.typeCourt.update).toHaveBeenCalledWith({
        where: { id: 1, accountId: 1 },
        data: {
          name: 'Updated Court',
          description: 'Updated description',
          image: 'updated-image-url',
          attributeCourt: {
            set: [],
            connect: [{ id: 1 }, { id: 2 }],
          },
          priceTypeCourt: {
            set: [],
            create: updatePayload.priceTypeCourt,
          },
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });

  describe('getByName', () => {
    it('should return a TypeCourt by name and accountId', async () => {
      const mockTypeCourt = {
        id: 1,
        name: 'Court 1',
        accountId: 1,
      } as TypeCourt;

      (database.typeCourt.findFirst as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.getByName(
        'Court 1',
        1
      );

      expect(database.typeCourt.findFirst).toHaveBeenCalledWith({
        where: {
          accountId: 1,
          name: 'Court 1',
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });

  describe('get', () => {
    it('should return a TypeCourt by id and accountId with related data', async () => {
      const mockTypeCourt = {
        id: 1,
        accountId: 1,
        attributeCourt: [],
        priceTypeCourt: [],
      };

      (database.typeCourt.findFirst as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.get(1, 1);

      expect(database.typeCourt.findFirst).toHaveBeenCalledWith({
        where: {
          accountId: 1,
          id: 1,
        },
        include: {
          attributeCourt: {
            include: {
              attributeKeyCourt: true,
            },
          },
          priceTypeCourt: true,
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });

  describe('delete', () => {
    it('should delete a TypeCourt and related PriceTypeCourt entries', async () => {
      const mockTypeCourt = {
        id: 1,
        accountId: 1,
      } as TypeCourt;

      (database.typeCourt.delete as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.delete(1, 1);

      expect(database.priceTypeCourt.deleteMany).toHaveBeenCalledWith(
        {
          where: { typeCourtId: 1 },
        }
      );
      expect(database.typeCourt.delete).toHaveBeenCalledWith({
        where: {
          accountId: 1,
          id: 1,
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });

  describe('getPrice', () => {
    it('should return all price entries for a TypeCourt ordered by startTime', async () => {
      const mockPrices = [
        {
          id: 1,
          typeCourtId: 1,
          startTime: new Date(),
          endTime: new Date(),
          price: 100,
          times: 1,
        },
      ] as PriceTypeCourt[];

      (
        database.priceTypeCourt.findMany as jest.Mock
      ).mockResolvedValue(mockPrices);

      const result = await typeCourtHostService.getPrice(1);

      expect(database.priceTypeCourt.findMany).toHaveBeenCalledWith({
        where: { typeCourtId: 1 },
        orderBy: { startTime: 'asc' },
      });
      expect(result).toEqual(mockPrices);
    });
  });

  describe('getAll', () => {
    it('should return all TypeCourt entries for an account with related data', async () => {
      const mockTypeCourts = [
        {
          id: 1,
          accountId: 1,
          attributeCourt: [],
          priceTypeCourt: [],
          court: [],
        },
      ];

      (database.typeCourt.findMany as jest.Mock).mockResolvedValue(
        mockTypeCourts
      );

      const result = await typeCourtHostService.getAll(1);

      expect(database.typeCourt.findMany).toHaveBeenCalledWith({
        where: { accountId: 1 },
        include: {
          attributeCourt: {
            include: {
              attributeKeyCourt: true,
            },
          },
          priceTypeCourt: true,
          court: true,
        },
      });
      expect(result).toEqual(mockTypeCourts);
    });
  });

  describe('createPrice', () => {
    it('should create a new price entry for a TypeCourt', async () => {
      const mockPrice = {
        id: 1,
        typeCourtId: 1,
        startTime: new Date(),
        endTime: new Date(),
        price: 100,
        times: 1,
      } as PriceTypeCourt;

      const priceData = {
        endTime: new Date(),
        price: 100,
        startTime: new Date(),
        times: 1,
      };

      (database.priceTypeCourt.create as jest.Mock).mockResolvedValue(
        mockPrice
      );

      const result = await typeCourtHostService.createPrice(
        1,
        priceData
      );

      expect(database.priceTypeCourt.create).toHaveBeenCalledWith({
        data: {
          endTime: priceData.endTime,
          price: priceData.price,
          startTime: priceData.startTime,
          times: priceData.times,
          typeCourtId: 1,
        },
      });
      expect(result).toEqual(mockPrice);
    });
  });

  describe('updatePrice', () => {
    it('should update an existing price entry for a TypeCourt', async () => {
      const mockPrice = {
        id: 1,
        typeCourtId: 1,
        startTime: new Date(),
        endTime: new Date(),
        price: 150,
        times: 2,
      } as PriceTypeCourt;

      const priceData = {
        id: 1,
        endTime: new Date(),
        price: 150,
        startTime: new Date(),
        times: 2,
      };

      (database.priceTypeCourt.update as jest.Mock).mockResolvedValue(
        mockPrice
      );

      const result = await typeCourtHostService.updatePrice(
        1,
        priceData
      );

      expect(database.priceTypeCourt.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          endTime: priceData.endTime,
          price: priceData.price,
          startTime: priceData.startTime,
          times: priceData.times,
          typeCourtId: 1,
        },
      });
      expect(result).toEqual(mockPrice);
    });
  });

  describe('deletePrice', () => {
    it('should delete a price entry for a TypeCourt', async () => {
      const mockPrice = {
        id: 1,
        typeCourtId: 1,
      } as PriceTypeCourt;

      (database.priceTypeCourt.delete as jest.Mock).mockResolvedValue(
        mockPrice
      );

      const result = await typeCourtHostService.deletePrice(1, {
        id: 1,
      });

      expect(database.priceTypeCourt.delete).toHaveBeenCalledWith({
        where: { id: 1, typeCourtId: 1 },
      });
      expect(result).toEqual(mockPrice);
    });
  });

  describe('replaceAttributeCourt', () => {
    it('should replace an attributeCourt entry for a TypeCourt', async () => {
      const mockTypeCourt = {
        id: 1,
        attributeCourt: [],
      };

      (database.typeCourt.update as jest.Mock).mockResolvedValue(
        mockTypeCourt
      );

      const result = await typeCourtHostService.replaceAttributeCourt(
        1,
        1,
        2
      );

      expect(database.typeCourt.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          attributeCourt: {
            disconnect: { id: 1 },
            connect: { id: 2 },
          },
        },
        include: {
          attributeCourt: true,
        },
      });
      expect(result).toEqual(mockTypeCourt);
    });
  });
});
