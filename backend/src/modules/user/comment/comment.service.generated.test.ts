import database from '../../../lib/db.server';
import commentUserService from './comment.service';

jest.mock('../../../lib/db.server', () => ({
  comment: {
    create: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('commentUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const mockComment = {
        id: 1,
        content: 'This is a comment',
        blogId: 1,
        accountId: 1,
      };

      (database.comment.create as jest.Mock).mockResolvedValue(
        mockComment
      );

      const result = await commentUserService.create(1, {
        content: 'This is a comment',
        blogId: 1,
      });

      expect(database.comment.create).toHaveBeenCalledWith({
        data: {
          content: 'This is a comment',
          blogId: 1,
          accountId: 1,
        },
      });
      expect(result).toEqual(mockComment);
    });
  });

  describe('delete', () => {
    it('should delete a comment by id and accountId', async () => {
      const mockComment = {
        id: 1,
        content: 'This is a comment',
        blogId: 1,
        accountId: 1,
      };

      (database.comment.delete as jest.Mock).mockResolvedValue(
        mockComment
      );

      const result = await commentUserService.delete(1, 1);

      expect(database.comment.delete).toHaveBeenCalledWith({
        where: {
          id: 1,
          accountId: 1,
        },
      });
      expect(result).toEqual(mockComment);
    });
  });
});
