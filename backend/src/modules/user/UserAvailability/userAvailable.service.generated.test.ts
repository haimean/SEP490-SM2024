import database from '../../../lib/db.server';
import userAvailableService from './userAvailable.service';

jest.mock('../../../lib/db.server', () => ({
  userAvailability: {
    findMany: jest.fn(),
  },
  post: {
    findUnique: jest.fn(),
  },
  invitation: {
    findMany: jest.fn(),
  },
  booking: {
    findMany: jest.fn(),
  },
}));

describe('userAvailableService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listAvailable', () => {
    it('should return user availability based on filters', async () => {
      const mockAvailability = [{ id: 1 }];
      (
        database.userAvailability.findMany as jest.Mock
      ).mockResolvedValue(mockAvailability);

      const result = await userAvailableService.listAvailable(
        new Date(),
        new Date(),
        'provinces',
        'districts'
      );

      expect(database.userAvailability.findMany).toHaveBeenCalledWith(
        {
          where: {
            startTime: { gte: expect.any(Date) },
            endTime: { lte: expect.any(Date) },
            provinces: { contains: 'provinces' },
            districts: { contains: 'districts' },
          },
        }
      );
      expect(result).toEqual(mockAvailability);
    });
  });

  describe('getPost', () => {
    it('should return a post by id with related data', async () => {
      const mockPost = { id: 1 };
      (database.post.findUnique as jest.Mock).mockResolvedValue(
        mockPost
      );

      const result = await userAvailableService.getPost(1);

      expect(database.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          memberPost: true,
          booking: {
            include: {
              Court: {
                include: {
                  Branches: {
                    include: {
                      address: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe('getUserAvailableSamePost', () => {
    it('should return user availability with same level, districts, provinces and same day', async () => {
      const mockUsers = [{ id: 1 }];
      (
        database.userAvailability.findMany as jest.Mock
      ).mockResolvedValue(mockUsers);

      const data = {
        provinces: 'provinces',
        districts: 'districts',
        date: new Date(),
      };

      const result =
        await userAvailableService.getUserAvailableSamePost(data);

      expect(database.userAvailability.findMany).toHaveBeenCalledWith(
        {
          where: {
            districts: 'districts',
            provinces: 'provinces',
            startTime: {
              gte: expect.any(Date),
              lte: expect.any(Date),
            },
          },
          include: {
            account: {
              include: {
                user: true,
              },
            },
          },
        }
      );
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getInvitation', () => {
    it('should return invitations for a specific post and account excluding canceled invitations', async () => {
      const mockInvitations = [{ id: 1 }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result = await userAvailableService.getInvitation(1, 1);

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          postId: 1,
          status: { not: 'CANCEL' },
          userAvailability: {
            accountId: 1,
          },
        },
      });
      expect(result).toEqual(mockInvitations);
    });
  });

  describe('getBookingFindByTime', () => {
    it('should return bookings for a specific account and time range', async () => {
      const mockBookings = [{ id: 1 }];
      (database.booking.findMany as jest.Mock).mockResolvedValue(
        mockBookings
      );

      const result = await userAvailableService.getBookingFindByTime(
        1,
        new Date(),
        new Date()
      );

      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          accountId: 1,
          isDelete: false,
          OR: [
            {
              startTime: {
                gte: expect.any(Date),
                lte: expect.any(Date),
              },
            },
            {
              endTime: {
                gte: expect.any(Date),
                lte: expect.any(Date),
              },
            },
          ],
        },
      });
      expect(result).toEqual(mockBookings);
    });
  });

  describe('getInvitationFindByTime', () => {
    it('should return invitations for a specific account and time range with accepted status', async () => {
      const mockInvitations = [{ id: 1 }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result =
        await userAvailableService.getInvitationFindByTime(
          1,
          new Date(),
          new Date()
        );

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          userAvailability: { accountId: 1 },
          status: 'ACCEPT',
          Post: {
            booking: {
              OR: [
                {
                  startTime: {
                    gte: expect.any(Date),
                    lte: expect.any(Date),
                  },
                },
                {
                  endTime: {
                    gte: expect.any(Date),
                    lte: expect.any(Date),
                  },
                },
              ],
            },
          },
        },
      });
      expect(result).toEqual(mockInvitations);
    });
  });

  describe('getUserMatch', () => {
    it('should return users matching the post with NEW status invitations', async () => {
      const mockInvitations = [{ userAvailability: { id: 1 } }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result = await userAvailableService.getUserMatch(1);

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: { postId: 1, status: 'NEW' },
        include: {
          userAvailability: {
            include: {
              Invitation: {
                where: { status: 'NEW', postId: 1 },
              },
              account: {
                include: { user: true },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual([mockInvitations[0].userAvailability]);
    });
  });

  describe('getUserAccept', () => {
    it('should return users with ACCEPTED invitations for a specific post', async () => {
      const mockInvitations = [{ id: 1 }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result = await userAvailableService.getUserAccept(1);

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: { postId: 1, status: 'ACCEPT' },
        include: {
          userAvailability: {
            include: {
              account: {
                include: { user: true },
              },
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
      expect(result).toEqual(mockInvitations);
    });
  });

  describe('getRequestListJoin', () => {
    it('should return the request list for joining unavailable posts', async () => {
      const mockRequests = [{ id: 1 }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockRequests
      );

      const result = await userAvailableService.getRequestListJoin(
        1,
        'NEW'
      );

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          type: 'UNAVAILABLE',
          status: 'NEW',
          userAvailability: { accountId: 1 },
        },
        include: {
          Post: {
            include: {
              booking: {
                include: {
                  bookingInfo: true,
                  account: {
                    include: { user: true },
                  },
                  Court: {
                    include: {
                      Branches: {
                        include: { address: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      expect(result).toEqual(mockRequests);
    });
  });
});
