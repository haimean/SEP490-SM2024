import database from '../lib/db.server';
import courtServiceBase from './courtServiceBase';

jest.mock('../lib/db.server', () => ({
  court: {
    findFirst: jest.fn(),
  },
}));

describe('courtServiceBase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a court by id', async () => {
      const mockCourt = { id: 1, name: 'Court 1' };

      (database.court.findFirst as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await courtServiceBase.findById(1);

      expect(database.court.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockCourt);
    });
  });
});
