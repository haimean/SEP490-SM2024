import database from '../../../lib/db.server';
import courtHostService from './court.service';

jest.mock('../../../lib/db.server', () => ({
  court: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('courtHostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new court with the provided payload', async () => {
      const payload = {
        name: 'Court 1',
        branchesId: 1,
        typeCourtId: 1,
      };

      const mockCourt = { id: 1, ...payload };

      (database.court.create as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await courtHostService.create(payload);

      expect(database.court.create).toHaveBeenCalledWith({
        data: payload,
      });
      expect(result).toEqual(mockCourt);
    });
  });

  describe('update', () => {
    it('should update a court with the provided payload', async () => {
      const payload = {
        id: 1,
        name: 'Updated Court',
        branchesId: 2,
        typeCourtId: 2,
      };

      const mockCourt = { ...payload };

      (database.court.update as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await courtHostService.update(payload);

      expect(database.court.update).toHaveBeenCalledWith({
        where: { id: payload.id },
        data: {
          name: payload.name,
          branchesId: payload.branchesId,
          typeCourtId: payload.typeCourtId,
        },
      });
      expect(result).toEqual(mockCourt);
    });
  });

  describe('getAll', () => {
    it('should return all courts', async () => {
      const mockCourts = [
        { id: 1, name: 'Court 1' },
        { id: 2, name: 'Court 2' },
      ];

      (database.court.findMany as jest.Mock).mockResolvedValue(
        mockCourts
      );

      const result = await courtHostService.getAll();

      expect(database.court.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCourts);
    });
  });

  describe('get', () => {
    it('should return courts by branchesId', async () => {
      const mockCourts = [
        { id: 1, name: 'Court 1', branchesId: 1 },
        { id: 2, name: 'Court 2', branchesId: 1 },
      ];

      (database.court.findMany as jest.Mock).mockResolvedValue(
        mockCourts
      );

      const result = await courtHostService.get(1);

      expect(database.court.findMany).toHaveBeenCalledWith({
        where: { branchesId: 1 },
        include: {
          Branches: true,
          TypeCourt: true,
        },
      });
      expect(result).toEqual(mockCourts);
    });
  });

  describe('getDetail', () => {
    it('should return detailed court information by id', async () => {
      const mockCourt = {
        id: 1,
        name: 'Court 1',
        branchesId: 1,
        typeCourtId: 1,
      };

      (database.court.findFirst as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await courtHostService.getDetail(1);

      expect(database.court.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          Branches: true,
          TypeCourt: true,
        },
      });
      expect(result).toEqual(mockCourt);
    });
  });

  describe('delete', () => {
    it('should delete a court by id', async () => {
      const mockCourt = { id: 1, name: 'Court 1' };

      (database.court.delete as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await courtHostService.delete(1);

      expect(database.court.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCourt);
    });
  });
});
