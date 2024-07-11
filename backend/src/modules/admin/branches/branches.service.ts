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
  getDefault: async (id: number): Promise<any> => {
    return await database.branches.findUnique({
      where: {
        id,
        isDelete: false,
      },
    });
  },

  setAccept: async (id: number, isAccept: boolean): Promise<any> => {
    return await database.branches.update({
      where: {
        id,
      },
      data: {
        isAccept,
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
