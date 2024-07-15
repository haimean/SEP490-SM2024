import database from '../../../lib/db.server';

const branchUserService = {
  listBranch: async (accountId: number) => {
    return await database.branches.findMany({
      where: {
        accountId,
        isAccept: true,
        isDelete: false,
      },
      include: {
        address: true,
        court: { include: { TypeCourt: true } },
        attributeBranches: {
          include: {
            attributeKeyBranches: true,
          },
        },
      },
    });
  },
};

export default branchUserService;
