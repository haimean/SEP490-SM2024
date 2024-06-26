import database from '../../../lib/db.server';

const branchService = {
  listBranch: async (
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
        name: nameSort === 'desc' ? 'asc' : 'desc',
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
    fakeAttributeKeyBranches;
    return await database.attributeKeyBranches.findMany();
  },
};

export default branchService;
