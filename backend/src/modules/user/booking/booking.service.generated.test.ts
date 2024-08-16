import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';
import { BookingCreateInput } from './booking.model';
import bookingUserService from './booking.service';

jest.mock('../../../lib/db.server', () => ({
  booking: {
    update: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  court: {
    findUnique: jest.fn(),
  },
}));

jest.mock('../../index.service', () => ({
  getQueryPagination: jest.fn(),
}));

describe('bookingUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('remove', () => {
    it('should mark a booking as deleted and return the updated booking', async () => {
      const mockBooking = {
        id: 1,
        accountId: 1,
        isDelete: true,
      };

      (database.booking.update as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingUserService.remove(1, 1);

      expect(database.booking.update).toHaveBeenCalledWith({
        where: {
          id: 1,
          accountId: 1,
        },
        data: {
          isDelete: true,
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });
  });

  describe('getAllForUser', () => {
    it('should return all bookings for a user with pagination', async () => {
      const mockBookings = [
        {
          id: 1,
          accountId: 1,
        },
      ];

      (database.booking.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBookings)
        .mockResolvedValueOnce(mockBookings);

      const pagination: Pagination = { page: 1, perPage: 10 };
      const result = await bookingUserService.getAllForUser(
        1,
        pagination
      );

      expect(database.booking.findMany).toHaveBeenCalledTimes(2);
      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          accountId: 1,
        },
      });
      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          accountId: 1,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: expect.any(Object),
        ...getQueryPagination(pagination),
      });
      expect(result).toEqual({
        response: mockBookings,
        total: mockBookings.length,
      });
    });
  });

  describe('getDetailBooking', () => {
    it('should return detailed booking information for a user', async () => {
      const mockBooking = {
        id: 1,
        accountId: 1,
        isDelete: false,
      };

      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingUserService.getDetailBooking(1, 1);

      expect(database.booking.findFirst).toHaveBeenCalledWith({
        where: {
          id: 1,
          accountId: 1,
          isDelete: false,
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });
  });

  describe('create', () => {
    it('should create a new booking with the provided data', async () => {
      const bookingData: BookingCreateInput = {
        accountId: 1,
        courtId: 1,
        endTime: new Date(),
        name: 'Test Name',
        numberPhone: '123456789',
        price: 100,
        startTime: new Date(),
      };

      const mockBooking = {
        id: 1,
        ...bookingData,
        bookingInfo: {
          id: 1,
          name: 'Test Name',
          numberPhone: '123456789',
        },
      };

      (database.booking.create as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingUserService.create(bookingData);

      expect(database.booking.create).toHaveBeenCalledWith({
        data: {
          endTime: bookingData.endTime,
          price: bookingData.price,
          startTime: bookingData.startTime,
          accountId: bookingData.accountId,
          courtId: bookingData.courtId,
          bookingInfo: {
            create: {
              name: bookingData.name,
              numberPhone: bookingData.numberPhone,
            },
          },
        },
        include: {
          bookingInfo: true,
        },
      });
      expect(result).toEqual(mockBooking);
    });
  });

  describe('getCourt', () => {
    it('should return court details by id', async () => {
      const mockCourt = {
        id: 1,
        name: 'Test Court',
      };

      (database.court.findUnique as jest.Mock).mockResolvedValue(
        mockCourt
      );

      const result = await bookingUserService.getCourt(1);

      expect(database.court.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: {
          Branches: true,
        },
      });
      expect(result).toEqual(mockCourt);
    });
  });

  describe('checkBookingConflict', () => {
    it('should return true if there is a conflicting booking', async () => {
      const mockBooking = {
        id: 1,
      };

      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingUserService.checkBookingConflict(
        1,
        new Date(),
        new Date(),
        1
      );

      expect(database.booking.findFirst).toHaveBeenCalledWith({
        where: {
          isDelete: false,
          OR: expect.any(Array),
        },
      });
      expect(result).toBe(true);
    });

    it('should return false if there is no conflicting booking', async () => {
      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        null
      );

      const result = await bookingUserService.checkBookingConflict(
        1,
        new Date(),
        new Date(),
        1
      );

      expect(result).toBe(false);
    });
  });
});
