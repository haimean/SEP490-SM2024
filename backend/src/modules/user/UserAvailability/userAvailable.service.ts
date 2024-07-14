import { Prisma } from '@prisma/client';
import database from '../../../lib/db.server';

const userAvailableService = {
  listAvailable: async (
    startTime: Date,
    endTime: Date,
    provinces: string,
    districts: string
  ) => {
    console.log('🚀 ========= districts:', districts);
    try {
      const filters: Prisma.userAvailabilityWhereInput = {
        status: 'AVAILABLE',
      };

      if (startTime) {
        filters.startTime = { gte: new Date(startTime) };
      }

      if (endTime) {
        filters.endTime = { lte: new Date(endTime) };
      }
      if (districts) {
        filters.districts = {
          contains: districts,
          // mode: 'insensitive', // optional: makes the search case-insensitive
        };
      }
      if (provinces) {
        filters.provinces = {
          contains: provinces,
          // mode: 'insensitive', // optional: makes the search case-insensitive
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
