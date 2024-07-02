import { Branches, Prisma } from '@prisma/client';
import database from '../../../lib/db.server';
import { BranchesHostServiceCreate } from './branches.model';
import { DefaultArgs } from '@prisma/client/runtime/library';

const branchesHostService = {
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
    return await database.attributeKeyBranches.findMany();
  },

  create: async (
    data: BranchesHostServiceCreate
  ): Promise<Branches> => {
    const {
      accountId,
      name,
      description,
      addressLatitude,
      addressLongitude,
      attributeBranches,
      court,
      image,
    } = data;
    const query: Prisma.BranchesCreateArgs<DefaultArgs> = {
      data: {
        accountId,
        name,
        addressLatitude,
        addressLongitude,
      },
    };
    if (description) {
      query.data.description = description;
    }
    if (image) {
      query.data.image = image;
    }
    if (attributeBranches) {
      const attributeBranchesIds = attributeBranches.map((item) => {
        return {
          id: item,
        };
      });
      query.data.attributeBranches = {
        connect: attributeBranchesIds,
      };
    }
    if (court) {
      const courtIds = court.map((item) => {
        return {
          id: item,
        };
      });
      query.data.attributeBranches = {
        connect: courtIds,
      };
    }
    return await database.branches.create(query);
  },
};

export default branchesHostService;
