import database from '../../../lib/db.server';
import dateUtils from '../../../utils/date';
import {
  BookingCreateInput,
  BookingUpdateInput,
} from './booking.model';
import bookingHostService from './booking.service';

jest.mock('../../../lib/db.server', () => ({
  booking: {
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
  branches: {
    findUnique: jest.fn(),
  },
}));

jest.mock('../../../utils/date', () => ({
  getLastWeekend: {
    mockReturnValue: jest.fn(),
  },
}));

describe('bookingHostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new booking with the provided data', async () => {
      const mockBooking: BookingCreateInput = {
        endTime: new Date(),
        price: 100,
        startTime: new Date(),
        accountId: 1,
        courtId: 1,
        name: 'minh',
        numberPhone: '096350085',
      };

      (database.booking.create as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingHostService.create(mockBooking);

      expect(database.booking.create).toHaveBeenCalledWith({
        data: {
          endTime: mockBooking.endTime,
          price: mockBooking.price,
          startTime: mockBooking.startTime,
          accountId: mockBooking.accountId,
          courtId: mockBooking.courtId,
          bookingInfo: {
            create: {
              name: mockBooking.name,
              numberPhone: mockBooking.numberPhone,
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

  describe('update', () => {
    it('should update an existing booking with the provided data', async () => {
      const mockBooking: BookingUpdateInput = {
        id: 1,
        endTime: new Date(),
        price: 150,
        startTime: new Date(),
        numberPhone: '987654321',
        name: 'Jane Doe',
      };

      (database.booking.update as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingHostService.update(mockBooking);

      expect(database.booking.update).toHaveBeenCalledWith({
        where: { id: mockBooking.id },
        data: {
          endTime: mockBooking.endTime,
          price: mockBooking.price,
          startTime: mockBooking.startTime,
          bookingInfo: {
            update: {
              numberPhone: mockBooking.numberPhone,
              name: mockBooking.name,
            },
          },
        },
        include: {
          bookingInfo: true,
          Court: {
            include: {
              Branches: true,
            },
          },
        },
      });
      expect(result).toEqual(mockBooking);
    });
  });

  describe('getBookingList', () => {
    it('should return a paginated list of bookings for a user', async () => {
      const mockBookings = [
        {
          id: 1,
          accountId: 1,
          startTime: new Date(),
        },
      ];

      (database.booking.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBookings)
        .mockResolvedValueOnce(mockBookings);

      const result = await bookingHostService.getBookingList(1, {
        page: 1,
        perPage: 10,
      });

      expect(database.booking.findMany).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        data: mockBookings,
        total: mockBookings.length,
      });
    });
  });

  describe('getDetailBooking', () => {
    it('should return detailed booking information by id', async () => {
      const mockBooking = {
        id: 1,
        startTime: new Date(),
        endTime: new Date(),
      };

      (database.booking.findFirst as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingHostService.getDetailBooking(1);

      expect(database.booking.findFirst).toHaveBeenCalledWith({
        where: {
          id: 1,
          isDelete: false,
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });
  });

  describe('getBookingHostList', () => {
    it('should return a paginated list of bookings for a host', async () => {
      const mockBookings = [
        {
          id: 1,
          courtId: 1,
          startTime: new Date(),
        },
      ];

      (database.booking.findMany as jest.Mock)
        .mockResolvedValueOnce(mockBookings)
        .mockResolvedValueOnce(mockBookings);

      const result = await bookingHostService.getBookingHostList(
        1,
        1,
        { page: 1, perPage: 10 },
        { startTime: 'desc' }
      );

      expect(database.booking.findMany).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        bookings: mockBookings,
        total: mockBookings.length,
      });
    });
  });

  describe('getBookingHostByBranch', () => {
    it('should return a paginated list of bookings for a specific branch', async () => {
      const mockBranch = {
        court: [
          {
            booking: [
              { id: 1, startTime: new Date() },
              { id: 2, startTime: new Date() },
            ],
          },
        ],
      };

      (database.branches.findUnique as jest.Mock).mockResolvedValue(
        mockBranch
      );

      const result = await bookingHostService.getBookingHostByBranch(
        1,
        { page: 1, perPage: 10 }
      );

      expect(database.branches.findUnique).toHaveBeenCalledWith(
        expect.any(Object)
      );
      expect(result.data.length).toBe(2);
      expect(result.total).toBe(2);
    });
  });

  describe('cancel', () => {
    it('should mark a booking as canceled with a reason', async () => {
      const mockBooking = {
        id: 1,
        isDelete: true,
        reasonCancell: 'No longer needed',
      };

      (database.booking.update as jest.Mock).mockResolvedValue(
        mockBooking
      );

      const result = await bookingHostService.cancel(
        1,
        'No longer needed'
      );

      expect(database.booking.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isDelete: true,
          reasonCancell: 'No longer needed',
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });
  });
});
