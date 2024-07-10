import database from '../../../lib/db.server';

const branchesAdminService = {
  getAll: async () => {
    return await database.branches.findMany({
      where: {
        isAccept: true,
        isDelete: false,
      },
      include: {
        address: true,
      },
    });
  },
  get: async (id: number): Promise<any> => {
    return await database.branches.findUnique({
      where: {
        id,
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

export default branchesAdminService;
