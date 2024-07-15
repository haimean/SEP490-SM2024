import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookCourtHostService = {
  getBookCourtList: async (pagination: Pagination) => {
    const query = {
      include: {},
      ...getQueryPagination(pagination),
      orderBy: {},
    };
    (query.orderBy = {
      startTime: 'desc',
    }),
      (query.include = {
        account: {
          include: {
            user: true,
          },
        },
      });
    const result = await database.booking.findMany();
    const response = await database.booking.findMany(query);
    return {
      response,
      total: result.length,
    };
  },
};

export default bookCourtHostService;
