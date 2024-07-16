import { includes } from '../../../../_templates/module/new/prompt';
import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const bookingHostService = {
  getBookingList: async (
    accountId: number,
    pagination: Pagination
  ) => {
    const query = {
      where: {
        accountId,
        isDelete: false,
      },
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
        post: true,
        bookingInfo: true,
      });
    const result = await database.booking.findMany({
      where: {
        accountId,
      },
    });
    const response = await database.booking.findMany(query);
    return {
      data: response,
      total: result.length,
    };
  },
  getBookingHostList: async (
    accountId: number,
    pagination: Pagination
  ) => {
    const query = {
      where: {
        accountId,
        isDelete: false,
        isAccept: true,
      },
      include: {},
      ...getQueryPagination(pagination),
      orderBy: {},
    };
    query.include = {
      court: {
        include: {
          booking: {
            include: {
              account: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    };
    const result = await database.branches.findMany(query);
    const response = await database.branches.findMany(query);
    return {
      data: response,
      total: result.length,
    };
  },
};

export default bookingHostService;
