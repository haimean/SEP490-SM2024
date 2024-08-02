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
};

export default bookingAdminService;
