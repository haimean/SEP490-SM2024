import database from '../../../lib/db.server';

const accountService = {
  listAccount: async (
    nameSort: string,
    isVerify: string,
    email: string,
    currentPage: number,
    pageSize: number
  ) => {
    const skip = (currentPage - 1) * pageSize;
    const queryOption = {
      include: {
        account: true,
      },
      skip: skip,
      take: pageSize,
      orderBy: {},
    };
    if (nameSort) {
      queryOption.orderBy = {
        name: nameSort === 'asc' ? 'asc' : 'desc',
      };
    }
    if (isVerify) {
      queryOption.orderBy = {
        account: {
          isVerified: isVerify === 'asc' ? 'asc' : 'desc',
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
