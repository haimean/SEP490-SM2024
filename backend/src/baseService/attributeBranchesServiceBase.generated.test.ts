import database from '../lib/db.server';
import attributeBranchesServiceBase from './attributeBranchesServiceBase';

jest.mock('../lib/db.server', () => ({
  attributeBranches: {
    findFirst: jest.fn(),
  },
}));

describe('attributeBranchesServiceBase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return attribute branch by id with account included', async () => {
      const mockAttributeBranch = {
        id: 1,
        value: 'Test Value',
        isActive: true,
        account: { id: 1, email: 'test@example.com' },
      };

      (
        database.attributeBranches.findFirst as jest.Mock
      ).mockResolvedValue(mockAttributeBranch);

      const result = await attributeBranchesServiceBase.findById(1);

      expect(
        database.attributeBranches.findFirst
      ).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { account: true },
      });
      expect(result).toEqual(mockAttributeBranch);
    });
  });
});
