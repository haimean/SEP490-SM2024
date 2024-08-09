import database from '../../../lib/db.server';
import { Pagination } from '../../index.model';
import { getQueryPagination } from '../../index.service';

const branchesAdminService = {
  getAll: async () => {
    return await database.branches.findMany({
      where: {
        isAccept: false,
        isDelete: false,
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
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
  getAllWithAccount: async (pagination: Pagination) => {
    const resultCount = await database.branches.findMany({
      where: {
        isAccept: true,
        isDelete: false,
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
        address: true,
      },
      orderBy: {
        accountId: 'asc',
      },
    });
    const result = await database.branches.findMany({
      where: {
        isAccept: true,
        isDelete: false,
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
        address: true,
      },
      orderBy: {
        accountId: 'asc',
      },
      ...getQueryPagination(pagination),
    });
    return {
      data: result,
      total: resultCount.length,
    };
  },
};

export default branchesAdminService;
