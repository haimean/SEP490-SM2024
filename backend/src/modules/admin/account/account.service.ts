import database from '../../../lib/db.server';
import dateUtils from '../../../utils/date';
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
    queryOption.orderBy = {
      ...queryOption.orderBy,
      createdAt: 'desc',
    };
    const result = await database.user.findMany(queryOption);
    const totalCount = (await database.user.findMany()).length;
    return { result, totalCount };
  },

  banAccount: async (id: number) => {
    const existAccount = await database.account.findUnique({
      where: {
        id,
      },
    });
    if (existAccount) {
      return await database.account.update({
        where: {
          id,
        },
        data: {
          isActive: !existAccount.isActive,
        },
      });
    } else {
      throw new Error('Account not exist');
    }
  },
  listMonthAccount: async () => {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );
    const result = await database.account.findMany({
      where: {
        role: { not: 'ADMIN' },
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    return result;
  },

  listPreviousMonthAccount: async () => {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const result = await database.account.findMany({
      where: {
        role: { not: 'ADMIN' },
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    return result;
  },
  getListAccountNoSort: async () => {
    const resultAdmin = await database.account.findMany({
      where: {
        role: 'ADMIN',
      },
    });
    const resultHost = await database.account.findMany({
      where: {
        role: 'HOST',
      },
    });
    const resultPlayer = await database.account.findMany({
      where: {
        role: 'USER',
      },
    });
    return {
      totalAdmin: resultAdmin.length,
      totalHost: resultHost.length,
      totalPlayer: resultPlayer.length,
    };
  },
  getListAccount12MonthLatest: async (
    date: Date,
    role: 'USER' | 'HOST'
  ) => {
    const { gte, lt } = dateUtils.getDateStartAndEndOfMonth(date);
    const result = await database.account.findMany({
      where: {
        role: role,
        createdAt: { gte, lt },
      },
    });
    return result;
  },
  getListAccountWithDate: async (
    dateFilter: Date,
    role: 'USER' | 'HOST'
  ) => {
    const year = dateFilter.getFullYear();
    const month = dateFilter.getMonth();
    const date = dateFilter.getDay();
    const result = await database.account.findMany({
      where: {
        role: role,
        createdAt: {
          gte: new Date(year, month, date < 7 ? 1 : date - 7),
          lt: new Date(year, month, date),
        },
      },
    });
    return result;
  },
  getListAccountInMonth: async (
    year: number,
    month: number,
    date: number,
    role: 'USER' | 'HOST'
  ) => {
    // Create the start date of the specified day
    const startDate = new Date(Date.UTC(year, month - 1, date + 1));

    // Create the start date of the next day in UTC
    const endDate = new Date(Date.UTC(year, month - 1, date + 2));
    const result = await database.account.findMany({
      where: {
        role: role,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return result;
  },
};

export default accountService;
