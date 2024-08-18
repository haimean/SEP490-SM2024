import database from '../../../lib/db.server';
import bookingGuestService from './booking.service';

jest.mock('../../../lib/db.server', () => ({
  booking: {
    findMany: jest.fn(),
  },
  invitation: {
    findMany: jest.fn(),
  },
}));

describe('bookingGuestService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBookingPost', () => {
    it('should return booking posts within the next 7 days', async () => {
      const mockBookings = [
        { id: 1, startTime: new Date(), isDelete: false },
      ];
      (database.booking.findMany as jest.Mock).mockResolvedValue(
        mockBookings
      );

      const result = await bookingGuestService.getBookingPost();

      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          startTime: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
          isDelete: false,
          post: {
            isNot: null,
          },
        },
        include: {
          bookingInfo: true,
          post: {
            include: {
              memberPost: true,
              invitation: true,
            },
          },
          Court: {
            include: {
              Branches: {
                include: {
                  attributeBranches: {
                    include: {
                      attributeKeyBranches: true,
                    },
                  },
                  address: true,
                },
              },
              TypeCourt: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBookings);
    });
  });

  describe('getBookingPostLogin', () => {
    it('should return booking posts within the next 7 days for logged in users excluding their own bookings', async () => {
      const mockBookings = [
        { id: 1, startTime: new Date(), isDelete: false },
      ];
      (database.booking.findMany as jest.Mock).mockResolvedValue(
        mockBookings
      );

      const result = await bookingGuestService.getBookingPostLogin(1);

      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          startTime: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
          isDelete: false,
          post: {
            isNot: null,
          },
          accountId: {
            not: 1,
          },
        },
        include: {
          bookingInfo: true,
          post: {
            include: {
              memberPost: true,
              invitation: {
                where: {
                  status: 'ACCEPT',
                },
                include: {
                  userAvailability: true,
                },
              },
            },
          },
          Court: {
            include: {
              Branches: {
                include: {
                  attributeBranches: {
                    include: {
                      attributeKeyBranches: true,
                    },
                  },
                  address: true,
                },
              },
              TypeCourt: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBookings);
    });
  });

  describe('getInvitation', () => {
    it('should return invitations for a specific post and account excluding canceled invitations', async () => {
      const mockInvitations = [
        { id: 1, postId: 1, status: 'ACCEPT' },
      ];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result = await bookingGuestService.getInvitation(1, 1);

      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          postId: 1,
          status: {
            not: 'CANCEL',
          },
          userAvailability: {
            accountId: 1,
          },
        },
      });
      expect(result).toEqual(mockInvitations);
    });
  });
});
