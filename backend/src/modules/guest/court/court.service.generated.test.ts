import database from '../../../lib/db.server';
import courtService from './court.service';

jest.mock('../../../lib/db.server', () => ({
  court: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
}));

describe('courtService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all courts', async () => {
      const mockCourts = [{ id: 1, name: 'Court 1' }];
      (database.court.findMany as jest.Mock).mockResolvedValue(
        mockCourts
      );

      const result = await courtService.getAll();

      expect(database.court.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockCourts);
    });
  });

  describe('get', () => {
    it('should return courts by branchesId', async () => {
      const mockCourts = [{ id: 1, branchesId: 1 }];
      (database.court.findMany as jest.Mock).mockResolvedValue(
        mockCourts
      );

      const result = await courtService.get(1);

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
    it('should return court detail by id', async () => {
      const mockCourtDetail = {
        id: 1,
        Branches: { id: 1, name: 'Branch 1' },
        booking: [{ id: 1, isDelete: false }],
        TypeCourt: { id: 1, name: 'Type Court 1' },
      };
      (database.court.findFirst as jest.Mock).mockResolvedValue(
        mockCourtDetail
      );

      const result = await courtService.getDetail(1);

      expect(database.court.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          Branches: {
            include: {
              address: true,
              account: {
                include: {
                  user: true,
                },
              },
            },
          },
          booking: {
            where: { isDelete: false },
            include: {
              bookingInfo: true,
              account: true,
              post: {
                include: {
                  memberPost: true,
                  invitation: true,
                },
              },
            },
          },
          TypeCourt: {
            include: {
              attributeCourt: {
                include: {
                  attributeKeyCourt: true,
                },
              },
              priceTypeCourt: true,
            },
          },
        },
      });
      expect(result).toEqual(mockCourtDetail);
    });
  });
});
