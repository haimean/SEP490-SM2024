import {
  Invitation,
  Post,
  StatusInvitation,
  TypeInvitation,
} from '@prisma/client';

import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import invitationUserService from './invitation.service';

jest.mock('../../../lib/db.server', () => ({
  invitation: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  userAvailability: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  post: {
    findUnique: jest.fn(),
  },
  booking: {
    findFirst: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('invitationUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new invitation', async () => {
      const mockInvitation = {
        id: 1,
        type: 'AVAILABLE',
        userAvailabilityId: 1,
        postId: 1,
        status: 'NEW',
      } as Invitation;

      (database.invitation.create as jest.Mock).mockResolvedValue(
        mockInvitation
      );

      const result = await invitationUserService.create(
        TypeInvitation.AVAILABLE,
        1,
        1
      );

      expect(database.invitation.create).toHaveBeenCalledWith({
        data: {
          userAvailabilityId: 1,
          postId: 1,
          type: 'AVAILABLE',
          status: 'NEW',
        },
      });
      expect(result).toEqual(mockInvitation);
    });
  });

  describe('getInvitation', () => {
    it('should return invitations for a specific post and account excluding canceled invitations', async () => {
      const mockInvitations = [{ id: 1 }];
      (database.invitation.findMany as jest.Mock).mockResolvedValue(
        mockInvitations
      );

      const result = await invitationUserService.getInvitation(1, 1);

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

  describe('getUserAvailability', () => {
    it('should return user availability by id', async () => {
      const mockUserAvailability = { id: 1 };

      (
        database.userAvailability.findUnique as jest.Mock
      ).mockResolvedValue(mockUserAvailability);

      const result = await invitationUserService.getUserAvailability(
        1
      );

      expect(
        database.userAvailability.findUnique
      ).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUserAvailability);
    });
  });

  describe('getAvailable', () => {
    it('should return the first available invitation for a specific post and account', async () => {
      const mockInvitation = { id: 1 };

      (database.invitation.findFirst as jest.Mock).mockResolvedValue(
        mockInvitation
      );

      const result = await invitationUserService.getAvailable(1, 1);

      expect(database.invitation.findFirst).toHaveBeenCalledWith({
        where: {
          postId: 1,
          userAvailability: {
            accountId: 1,
          },
        },
      });
      expect(result).toEqual(mockInvitation);
    });
  });

  describe('createForPlayer', () => {
    it('should create a new invitation and user availability for a player', async () => {
      const mockPost = {
        id: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
        bookingId: 1,

        booking: {
          updatedAt: new Date(),
          createdAt: new Date(),
          Court: {
            Branches: {
              address: {
                districts: 'District 1',
                provinces: 'Province 1',
              },
            },
          },
          endTime: new Date(),
          startTime: new Date(),
        },
        memberPost: [{ level: 'Beginner' }],
      };

      const mockUserAvailability = { id: 1 };

      const mockInvitation = {
        id: 1,
        userAvailabilityId: 1,
        postId: 1,
        status: 'NEW',
      } as Invitation;

      (database.post.findUnique as jest.Mock).mockResolvedValue(
        mockPost
      );
      (
        database.userAvailability.create as jest.Mock
      ).mockResolvedValue(mockUserAvailability);
      (database.invitation.create as jest.Mock).mockResolvedValue(
        mockInvitation
      );

      const result = await invitationUserService.createForPlayer(
        TypeInvitation.AVAILABLE,
        1,
        1
      );

      expect(database.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          booking: {
            include: {
              Court: {
                include: {
                  Branches: { include: { address: true } },
                },
              },
            },
          },
          memberPost: true,
        },
      });

      expect(database.userAvailability.create).toHaveBeenCalledWith({
        data: {
          districts: 'District 1',
          endTime: expect.any(Date),
          startTime: expect.any(Date),
          provinces: 'Province 1',
          accountId: 1,
          level: 'Beginner',
        },
      });

      expect(database.invitation.create).toHaveBeenCalledWith({
        data: {
          postId: 1,
          type: 'AVAILABLE',
          status: 'NEW',
          userAvailabilityId: 1,
        },
        include: {
          userAvailability: true,
          Post: {
            include: {
              booking: true,
            },
          },
        },
      });

      expect(result).toEqual(mockInvitation);
    });
  });

  describe('getPost', () => {
    it('should return a post by id', async () => {
      const mockPost = { id: 1 } as Post;

      (database.post.findUnique as jest.Mock).mockResolvedValue(
        mockPost
      );

      const result = await invitationUserService.getPost(1);

      expect(database.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe('getAllUnavailable', () => {
    it('should return all unavailable invitations for a post with pagination', async () => {
      const mockInvitations = [{ id: 1 }] as Invitation[];

      (database.invitation.findMany as jest.Mock)
        .mockResolvedValueOnce(mockInvitations)
        .mockResolvedValueOnce(mockInvitations);

      const pagination: Pagination = { page: 1, perPage: 10 };
      const result = await invitationUserService.getAllUnavailable(
        1,
        pagination
      );

      expect(database.invitation.findMany).toHaveBeenCalledTimes(2);
      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: { postId: 1 },
      });
      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: { postId: 1 },
        include: expect.any(Object),
        ...getQueryPagination(pagination),
      });

      expect(result).toEqual({
        data: mockInvitations,
        total: mockInvitations.length,
      });
    });
  });

  describe('getUnavailableOfUser', () => {
    it('should return all unavailable invitations of a user with pagination', async () => {
      const mockInvitations = [{ id: 1 }] as Invitation[];

      (database.invitation.findMany as jest.Mock)
        .mockResolvedValueOnce(mockInvitations)
        .mockResolvedValueOnce(mockInvitations);

      const pagination: Pagination = { page: 1, perPage: 10 };
      const result = await invitationUserService.getUnavailableOfUser(
        1,
        pagination
      );

      expect(database.invitation.findMany).toHaveBeenCalledTimes(2);
      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          userAvailability: {
            accountId: 1,
          },
          type: 'UNAVAILABLE',
        },
      });
      expect(database.invitation.findMany).toHaveBeenCalledWith({
        where: {
          userAvailability: {
            accountId: 1,
          },
          type: 'UNAVAILABLE',
        },
        include: expect.any(Object),
        ...getQueryPagination(pagination),
      });

      expect(result).toEqual({
        data: mockInvitations,
        total: mockInvitations.length,
      });
    });
  });

  describe('update', () => {
    it('should update an invitation by id', async () => {
      const mockInvitation = {
        id: 1,
        status: StatusInvitation.ACCEPT,
        reasonCancel: 'No longer needed',
      } as Invitation;

      const updateData = {
        invitationId: 1,
        status: StatusInvitation.ACCEPT,
        reasonCancel: 'No longer needed',
      };

      (database.invitation.update as jest.Mock).mockResolvedValue(
        mockInvitation
      );

      const result = await invitationUserService.update(updateData);

      expect(database.invitation.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          status: StatusInvitation.ACCEPT,
          reasonCancel: 'No longer needed',
        },
        include: expect.any(Object),
      });

      expect(result).toEqual(mockInvitation);
    });
  });

  describe('getInvitationById', () => {
    it('should return an invitation by id', async () => {
      const mockInvitation = { id: 1 } as Invitation;

      (database.invitation.findFirst as jest.Mock).mockResolvedValue(
        mockInvitation
      );

      const result = await invitationUserService.getInvitationById(1);

      expect(database.invitation.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockInvitation);
    });
  });

  describe('checkBookingConflict', () => {
    it('should check for conflicting bookings', async () => {
      const mockBooking = { id: 1 };

      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await invitationUserService.checkBookingConflict(
        1,
        new Date(),
        new Date()
      );

      expect(database.booking.findFirst).toHaveBeenCalledWith({
        where: {
          isDelete: false,
          startTime: { lte: expect.any(Date) },
          endTime: { gte: expect.any(Date) },
          OR: [
            { accountId: 1 },
            {
              post: {
                invitation: {
                  every: {
                    status: 'ACCEPT',
                    userAvailability: {
                      accountId: 1,
                    },
                  },
                },
              },
            },
          ],
        },
      });
      expect(result).toBe(true);
    });

    it('should return false if no conflicting bookings are found', async () => {
      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        null
      );

      const result = await invitationUserService.checkBookingConflict(
        1,
        new Date(),
        new Date()
      );

      expect(result).toBe(false);
    });
  });
});
