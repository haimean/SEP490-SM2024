import database from '../../../lib/db.server';
import dateUtils from '../../../utils/date';
import bookingAdminService from './booking.service';

jest.mock('../../../lib/db.server', () => ({
  booking: {
    findMany: jest.fn(),
  },
  post: {
    findMany: jest.fn(),
  },
}));

jest.mock('../../../utils/date', () => ({
  getDateStartAndEndOfMonth: jest.fn(),
}));

describe('bookingAdminService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getListBooking12MonthLatest', () => {
    it('should return bookings for the latest 12 months', async () => {
      const mockDate = new Date();
      const mockBookings = [
        { id: 1, isDelete: false, createdAt: new Date() },
      ];
      (
        dateUtils.getDateStartAndEndOfMonth as jest.Mock
      ).mockReturnValue({
        gte: new Date(mockDate.getFullYear(), mockDate.getMonth(), 1),
        lt: new Date(
          mockDate.getFullYear(),
          mockDate.getMonth() + 1,
          1
        ),
      });
      (database.booking.findMany as jest.Mock).mockResolvedValue(
        mockBookings
      );

      const result =
        await bookingAdminService.getListBooking12MonthLatest(
          mockDate
        );

      expect(database.booking.findMany).toHaveBeenCalledWith({
        where: {
          isDelete: false,
          createdAt: {
            gte: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth(),
              1
            ),
            lt: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth() + 1,
              1
            ),
          },
        },
      });
      expect(result).toEqual(mockBookings);
    });
  });

  describe('getListPost12MonthLatest', () => {
    it('should return posts for the latest 12 months', async () => {
      const mockDate = new Date();
      const mockPosts = [{ id: 1, createdAt: new Date() }];
      (
        dateUtils.getDateStartAndEndOfMonth as jest.Mock
      ).mockReturnValue({
        gte: new Date(mockDate.getFullYear(), mockDate.getMonth(), 1),
        lt: new Date(
          mockDate.getFullYear(),
          mockDate.getMonth() + 1,
          1
        ),
      });
      (database.post.findMany as jest.Mock).mockResolvedValue(
        mockPosts
      );

      const result =
        await bookingAdminService.getListPost12MonthLatest(mockDate);

      expect(database.post.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth(),
              1
            ),
            lt: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth() + 1,
              1
            ),
          },
        },
      });
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getListBookingInMonth', () => {
    it('should return bookings for the current and previous month', async () => {
      const mockDate = new Date();
      const mockCurrentMonthBookings = [
        {
          id: 1,
          createdAt: new Date(
            mockDate.getFullYear(),
            mockDate.getMonth() - 1,
            1
          ),
        },
      ];
      const mockPreviousMonthBookings = [
        {
          id: 2,
          createdAt: new Date(
            mockDate.getFullYear(),
            mockDate.getMonth() - 2,
            1
          ),
        },
      ];

      (database.post.findMany as jest.Mock)
        .mockResolvedValueOnce(mockCurrentMonthBookings)
        .mockResolvedValueOnce(mockPreviousMonthBookings);

      const result =
        await bookingAdminService.getListBookingInMonth();

      expect(database.post.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth() - 1,
              1
            ),
            lt: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth(),
              1
            ),
          },
        },
      });
      expect(database.post.findMany).toHaveBeenCalledWith({
        where: {
          createdAt: {
            gte: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth() - 2,
              1
            ),
            lt: new Date(
              mockDate.getFullYear(),
              mockDate.getMonth() - 1,
              1
            ),
          },
        },
      });
      expect(result).toEqual({
        result: mockCurrentMonthBookings,
        resultPreviousMonth: mockPreviousMonthBookings,
      });
    });
  });
});
