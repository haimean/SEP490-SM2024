import { Prisma } from '@prisma/client';

import database from '../lib/db.server';
import { DefaultArgs } from '@prisma/client/runtime/library';

const branchesBaseService = {
  getAll: async (
    where: Prisma.BranchesWhereInput,
    include: Prisma.BranchesInclude<DefaultArgs>
  ) => {
    return await database.branches.findMany({
      where,
      include,
    });
  },
  getAllPagination: async () => {
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
  get: async (
    where: Prisma.BranchesWhereUniqueInput,
    include: Prisma.BranchesInclude<DefaultArgs>
  ): Promise<any> => {
    return await database.branches.findUnique({
      where,
      include,
    });
  },
};

export default branchesBaseService;
