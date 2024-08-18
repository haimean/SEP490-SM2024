import database from '../../../lib/db.server';
import { getQueryPagination } from '../../index.service';
import postService from './post.service';

jest.mock('../../../lib/db.server', () => ({
  post: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('postService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return a post by id with related data', async () => {
      const mockPost = {
        id: 1,
        booking: {
          Court: {
            TypeCourt: { id: 1, name: 'Type Court 1' },
            Branches: {
              attributeBranches: [],
              address: {},
              account: {},
            },
          },
          bookingInfo: {},
        },
        memberPost: [],
        invitation: [],
      };

      (database.post.findUnique as jest.Mock).mockResolvedValue(
        mockPost
      );

      const result = await postService.get(1);

      expect(database.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          booking: {
            include: {
              Court: {
                include: {
                  TypeCourt: true,
                  Branches: {
                    include: {
                      attributeBranches: true,
                      address: true,
                      account: true,
                    },
                  },
                },
              },
              bookingInfo: true,
            },
          },
          memberPost: true,
          invitation: {
            include: {
              userAvailability: {
                include: {
                  account: true,
                },
              },
            },
          },
        },
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe('getTopThree', () => {
    it('should return the top three posts with related data', async () => {
      const mockPosts = [
        {
          id: 1,
          booking: {
            isDelete: false,
            Court: {
              TypeCourt: { id: 1, name: 'Type Court 1' },
              Branches: {
                attributeBranches: [],
                address: {},
                account: {},
              },
            },
            bookingInfo: {},
          },
          memberPost: [],
          invitation: [],
        },
      ];

      (database.post.findMany as jest.Mock).mockResolvedValue(
        mockPosts
      );

      const result = await postService.getTopThree();

      expect(database.post.findMany).toHaveBeenCalledWith({
        where: {
          booking: {
            isDelete: false,
          },
        },
        include: {
          booking: {
            include: {
              Court: {
                include: {
                  TypeCourt: true,
                  Branches: {
                    include: {
                      attributeBranches: true,
                      address: true,
                      account: true,
                    },
                  },
                },
              },
              bookingInfo: true,
            },
          },
          memberPost: true,
          invitation: {
            include: {
              userAvailability: {
                include: {
                  account: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        ...getQueryPagination({
          page: 1,
          perPage: 3,
        }),
      });
      expect(result).toEqual(mockPosts);
    });
  });
});
