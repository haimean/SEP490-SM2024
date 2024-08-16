import database from '../../../lib/db.server';
import reportBlogUserService from './reportBlog.service';

jest.mock('../../../lib/db.server', () => ({
  reportBlog: {
    create: jest.fn(),
  },
}));

describe('reportBlogUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new report for a blog', async () => {
      const reportData = {
        reason: 'Inappropriate content',
        accountId: 1,
        blogId: 1,
      };

      const mockReport = {
        id: 1,
        ...reportData,
      };

      (database.reportBlog.create as jest.Mock).mockResolvedValue(
        mockReport
      );

      const result = await reportBlogUserService.create(reportData);

      expect(database.reportBlog.create).toHaveBeenCalledWith({
        data: reportData,
      });
      expect(result).toEqual(mockReport);
    });
  });
});
