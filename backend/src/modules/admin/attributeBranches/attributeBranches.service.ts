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

const attributeBranchesService = {
  create: async (payload: AttributeBranches): Promise<object> => {
    return await database.attributeBranches.create({
      data: removeIdInObject(payload),
    });
  },
  update: async (
    id: number,
    payload: AttributeBranches
  ): Promise<object> => {
    return await database.attributeBranches.update({
      where: {
        id: payload.id,
      },
      data: removeIdInObject(payload),
    });
  },
  remove: async (id: number) => {
    return await database.attributeBranches.delete({
      where: {
        id: id,
      },
    });
  },
  getAll: async (): Promise<any> => {
    return await database.attributeBranches.findMany({
      include: {
        account: true,
        attributeKeyBranches: true,
      },
    });
  },

  get: async (id: number): Promise<object> => {
    return (
      (await database.attributeBranches.findFirst({
        where: {
          id: id,
        },
        include: {
          account: true,
          attributeKeyBranches: true,
        },
      })) ?? {}
    );
  },

  findAttributeKeyBranches: async (
    id: number
  ): Promise<AttributeKeyBranches | null> => {
    return await database.attributeKeyBranches.findFirst({
      where: {
        id,
      },
    });
  },
};

export default attributeBranchesService;
