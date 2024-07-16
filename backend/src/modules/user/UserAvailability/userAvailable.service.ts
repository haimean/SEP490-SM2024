import { Prisma } from '@prisma/client';
import database from '../../../lib/db.server';

const userAvailableService = {
  listAvailable: async (
    startTime: Date,
    endTime: Date,
    provinces: string,
    districts: string
  ) => {
    try {
      const filters: Prisma.UserAvailabilityWhereInput = {};

      if (startTime) {
        filters.startTime = { gte: new Date(startTime) };
      }

      if (endTime) {
        filters.endTime = { lte: new Date(endTime) };
      }
      if (districts) {
        filters.districts = {
          contains: districts,
        };
      }
      if (provinces) {
        filters.provinces = {
          contains: provinces,
        };
      }
      return await database.userAvailability.findMany({
        where: filters,
      });
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
};
export default userAvailableService;
