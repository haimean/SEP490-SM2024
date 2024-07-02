import { AttributeKeyCourt, Court } from '@prisma/client';
import database from '../../../lib/db.server';

const removeIdInObject = (data: any) => {
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const courtHostService = {
  findAttributeKeyCourt: async (
    id: number
  ): Promise<AttributeKeyCourt | null> => {
    return await database.attributeKeyCourt.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  },
  create: async (payload: Court): Promise<object> => {
    return await database.court.create({
      data: removeIdInObject(payload),
    });
  },

  getAll: async (): Promise<any> => {
    return await database.court.findMany();
  },
  get: async (id: number): Promise<any> => {
    return await database.court.findMany({
      where: {
        branchesId: id,
      },
    });
  },
  getDetail: async (id: number): Promise<any> => {
    return await database.court.findFirst({
      where: {
        id,
      },
    });
  },
};

export default courtHostService;
