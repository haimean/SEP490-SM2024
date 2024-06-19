import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const accountService = {
  listAccount: async (
    nameSort: string,
    isVerified: string,
    email: string,
    pagination: Pagination
  ) => {
    const queryOption = {
      include: {
        account: true,
      },
      ...getQueryPagination(pagination),
      orderBy: {},
    };
    if (nameSort) {
      queryOption.orderBy = {
        name: nameSort,
      };
    }
    if (isVerified) {
      queryOption.orderBy = {
        account: {
          isVerified: isVerified,
        },
      };
    }
    if (email) {
      queryOption.orderBy = {
        account: {
          email: email === 'asc' ? 'asc' : 'desc',
        },
      };
    }
    return await database.user.findMany(queryOption);
  },
};

export default accountService;
