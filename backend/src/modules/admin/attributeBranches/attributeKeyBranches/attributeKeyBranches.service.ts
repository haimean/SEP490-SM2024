import { AttributeKeyBranchesPayLoad } from './attributeKeyBranches.model';
import database from '../../../../lib/db.server';

const attributeKeyBranchesService = {
  create: async (
    payload: AttributeKeyBranchesPayLoad
  ): Promise<object> => {
    return await database.attributeKeyBranches.create({
      data: payload,
    });
  },
  update: async (
    id: number,
    payload: AttributeKeyBranchesPayLoad
  ): Promise<object> => {
    return await database.attributeKeyBranches.update({
      where: {
        id: id,
      },
      data: { name: payload.name },
    });
  },
  remove: async (id: number) => {
    return await database.attributeKeyBranches.delete({
      where: {
        id: id,
      },
    });
  },
  getAll: async (): Promise<any> => {
    return await database.attributeKeyBranches.findMany({
      include: {
        attributeBranches: true,
      },
    });
  },

  get: async (id: number): Promise<object> => {
    return (
      (await database.attributeKeyBranches.findFirst({
        where: {
          id: id,
        },
        include: {
          attributeBranches: true,
        },
      })) ?? {}
    );
  },
};

export default attributeKeyBranchesService;
