import {
  AttributeBranches,
  AttributeKeyBranches,
} from '@prisma/client';
import database from '../../../lib/db.server';

const removeIdInObject = (data: any) => {
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const attributeBranchesHostService = {
  findAttributeKeyBranches: async (
    id: number
  ): Promise<AttributeKeyBranches | null> => {
    return await database.attributeKeyBranches.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  },
  create: async (payload: AttributeBranches): Promise<object> => {
    return await database.attributeBranches.create({
      data: removeIdInObject(payload),
    });
  },

  getAll: async (accId: number): Promise<any> => {
    return await database.attributeKeyBranches.findMany({
      where: {
        isActive: true,
      },
      include: {
        attributeBranches: {
          where: {
            isActive: true,
            OR: [
              { isPublic: true },
              { isPublic: false, accountId: accId },
            ],
          },
        },
      },
    });
  },

  get: async (id: number, accId: number): Promise<any> => {
    return await database.attributeBranches.findFirst({
      where: {
        isActive: true,
        id,
        OR: [
          { isPublic: true },
          { isPublic: false, accountId: accId },
        ],
      },
      include: {
        account: true,
        attributeKeyBranches: true,
      },
    });
  },
};

export default attributeBranchesHostService;
