import database from '../../../lib/db.server';
import dateUtils from '../../../utils/date';

const bookingAdminService = {
  getListBooking12MonthLatest: async (date: Date) => {
    const { gte, lt } = dateUtils.getDateStartAndEndOfMonth(date);
    const result = await database.booking.findMany({
      where: {
        isDelete: false,
        createdAt: { gte, lt },
      },
    });
    return result;
  },
  getListPost12MonthLatest: async (date: Date) => {
    const { gte, lt } = dateUtils.getDateStartAndEndOfMonth(date);
    const result = await database.post.findMany({
      where: {
        createdAt: { gte, lt },
      },
    });
    return result;
  },
  getListBookingInMonth: async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month == 0) {
      const startDate = new Date(year, month - 1, 2);
      const endDate = new Date(year, month, 2);
    } else {
      const startDate = new Date(year - 1, 12, 2);
      const endDate = new Date(year, month, 2);
    }
    const result = await database.post.findMany({
      where: {
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
    const resultPreviousMonth = await database.post.findMany({
      where: {
        createdAt: {
          gte: new Date(year, month - 2, 1),
          lt: new Date(year, month - 1, 1),
        },
      },
    });
    return { result, resultPreviousMonth };
  },
};

export default bookingAdminService;
