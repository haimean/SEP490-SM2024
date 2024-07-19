import { Branches, Prisma } from '@prisma/client';
import database from '../../../lib/db.server';
import {
  AddressBranchHostServiceCreate,
  BranchesHostServiceCreate,
} from './branches.model';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { getObjectSignedUrl } from '../../../lib/s3';

const branchesHostService = {
  listBranch: async (accountId: number) => {
    const branches = await database.branches.findMany({
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
    const finalBranches = JSON.parse(JSON.stringify(branches));
    for (let index = 0; index < branches.length; index++) {
      if (finalBranches[index].image) {
        finalBranches[index].image = await getObjectSignedUrl(
          finalBranches[index].image
        );
        finalBranches[index].businessLicense =
          await getObjectSignedUrl(
            finalBranches[index].businessLicense
          );
      }
    }
    return finalBranches;
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
    if (branches && branches.image) {
      branches.image = await getObjectSignedUrl(branches.image);
      branches.businessLicense = await getObjectSignedUrl(
        branches.businessLicense
      );
    }
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
    try {
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
    } catch (error: any) {
      throw new Error(error);
    }
  },

  delete: async (id: number) => {
    try {
      const result = await database.branches.update({
        where: {
          id,
        },
        data: {
          isDelete: true,
        },
      });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default branchesHostService;
