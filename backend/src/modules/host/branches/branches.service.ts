import { Branches, Prisma } from '@prisma/client';
import database from '../../../lib/db.server';
import {
  AddressBranchHostServiceCreate,
  BranchesHostServiceCreate,
} from './branches.model';
import { DefaultArgs } from '@prisma/client/runtime/library';

const branchesHostService = {
  listBranch: async (accountId: number) => {
    const branches = await database.branches.findMany({
      where: {
        accountId,
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
  totalBranch: async (accountId: number) => {
    const branches = await database.branches.findMany({
      where: {
        accountId,
        isDelete: false,
      },
    });

    return { total: branches.length };
  },

  get: async (accountId: number, id: number): Promise<any> => {
    const branches = await database.branches.findUnique({
      where: {
        id,
        accountId,
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

  create: async (
    branchesPayload: BranchesHostServiceCreate,
    addressPayload: AddressBranchHostServiceCreate,
    attributeBranches: number[],
    court: number[]
  ): Promise<Branches> => {
    const {
      accountId,
      name,
      description,
      businessLicense,
      closingHours,
      openingHours,
      phone,
      image,
      email,
    } = branchesPayload;
    const query: Prisma.BranchesCreateArgs<DefaultArgs> = {
      data: {
        accountId,
        name,
        businessLicense,
        closingHours,
        openingHours,
        phone,
      },
    };
    if (image) {
      query.data.image = image;
    }
    if (description) {
      query.data.description = description;
    }
    if (email) {
      query.data.email = email;
    }
    if (addressPayload) {
      query.data.address = { create: { ...addressPayload } };
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
      query.data.court = {
        connect: courtIds,
      };
    }

    return await database.branches.create(query);
  },
  update: async (
    id: number,
    branchesPayload: Prisma.BranchesUpdateInput,
    attributeBranches: number[],
    court: number[]
  ): Promise<Branches> => {
    const {
      name,
      description,
      businessLicense,
      closingHours,
      openingHours,
      phone,
      image,
      email,
    } = branchesPayload;
    const query: Prisma.BranchesUpdateInput = {
      name,
      businessLicense,
      closingHours,
      openingHours,
      phone,
    };
    if (image) {
      query.image = image;
    }
    if (description) {
      query.description = description;
    }
    if (email) {
      query.email = email;
    }

    if (attributeBranches) {
      const attributeBranchesIds = attributeBranches.map((item) => {
        return {
          id: item,
        };
      });
      query.attributeBranches = {
        connect: attributeBranchesIds,
      };
    }
    if (court) {
      const courtIds = court.map((item) => {
        return {
          id: item,
        };
      });
      query.attributeBranches = {
        connect: courtIds,
      };
    }

    return await database.branches.update({
      where: {
        id,
      },
      data: query,
    });
  },

  delete: async (id: number) => {
    const result = await database.branches.update({
      where: {
        id,
      },
      data: {
        isDelete: true,
      },
    });
    return result;
  },

  getBookingNotStart: async (id: number) => {
    const result = await database.booking.findMany({
      where: {
        Court: {
          Branches: {
            id,
          },
        },
        startTime: {
          // from
          gte: new Date(),
        },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });
    return result;
  },
};

export default branchesHostService;
