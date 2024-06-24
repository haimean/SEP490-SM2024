import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const accountService = {
  listAccount: async (
    nameSort: string,
    isVerify: string,
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
    if (isVerify) {
      queryOption.orderBy = {
        account: {
          isVerified: isVerify,
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

  banAccount: async (id: number) => {
    const existAccount = await database.account.findUnique({
      where: {
        id,
      },
    });
    if (existAccount) {
      existAccount.isActive = false;
      return existAccount;
    } else {
      throw new Error('Account not exist');
    }
  },
};

export default accountService;
