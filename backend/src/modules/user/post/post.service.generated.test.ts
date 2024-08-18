import { Post, Prisma } from '@prisma/client';

import database from '../../../lib/db.server';
import { PostInputCreate } from './post.model';
import postUserService from './post.service';

jest.mock('../../../lib/db.server', () => ({
  post: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('postUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new post with the provided data', async () => {
      const postData: PostInputCreate = {
        title: 'Test Post',
        description: 'This is a test post',
        numberMember: 5,
        bookingId: 1,
        memberPost: [
          {
            id: 1,
            genderPost: 'FEMALE',
            level: 'CN',
            createdAt: new Date(),
            price: '12',
            updatedAt: new Date(),
          },
          {
            id: 2,
            genderPost: 'FEMALE',
            level: 'CN',
            createdAt: new Date(),
            price: '12',
            updatedAt: new Date(),
          },
        ],
      };

      const mockPost = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...postData,
      } as Post;

      (database.post.create as jest.Mock).mockResolvedValue(mockPost);

      const result = await postUserService.create(postData);

      expect(database.post.create).toHaveBeenCalledWith({
        data: {
          title: postData.title,
          description: postData.description,
          numberMember: postData.numberMember,
          bookingId: postData.bookingId,
          memberPost: {
            createMany: { data: postData.memberPost },
          },
        },
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe('get', () => {
    it('should return a post by id with related data', async () => {
      const mockPost = {
        id: 1,
        title: 'Test Post',
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

      const result = await postUserService.get(1);

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
});
