import database from '../../../lib/db.server';
import { getQueryPagination } from '../../index.service';

const branchesGuestService = {
  getAll: async () => {
    const branches = await database.branches.findMany({
      where: {
        isAccept: true,
        isDelete: false,
      },
      include: {
        address: true,
        account: {
          include: {
            user: true,
          },
        },
        court: { include: { TypeCourt: true } },
        attributeBranches: {
          include: {
            attributeKeyBranches: true,
          },
        },
      },
    });
    const finalBranches = JSON.parse(JSON.stringify(branches));
    return finalBranches;
  },
  getTopThree: async () => {
    const branches = await database.branches.findMany({
      where: {
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
      orderBy: {
        createdAt: 'desc',
      },
      ...getQueryPagination({
        page: 1,
        perPage: 3,
      }),
    });
    const finalBranches = JSON.parse(JSON.stringify(branches));
    return finalBranches;
  },
  get: async (id: number): Promise<any> => {
    const branches = await database.branches.findUnique({
      where: {
        id,
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
        court: { include: { TypeCourt: true } },
        attributeBranches: {
          include: {
            attributeKeyBranches: true,
          },
        },
      },
    });
    return branches;
  },
};

export default branchesGuestService;
