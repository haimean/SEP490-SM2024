import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookCourtHostService = {
  getBookCourtList: async (pagination: Pagination) => {
    const query = {
      ...getQueryPagination(pagination),
      orderBy: {},
    };
    (query.orderBy = {
      startTime: 'desc',
    }),
      console.log('🚀 ========= query:', query);
    return await database.booking.findMany(query);
  },
};

export default bookCourtHostService;
