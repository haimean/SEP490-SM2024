import { AttributeCourt, AttributeKeyCourt } from '@prisma/client';
import database from '../../../lib/db.server';

const removeIdInObject = (data: any) => {
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const attributeCourtHostService = {
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
  create: async (payload: AttributeCourt): Promise<object> => {
    return await database.attributeCourt.create({
      data: removeIdInObject(payload),
    });
  },

  getAll: async (accId: number): Promise<any> => {
    return await database.attributeCourt.findMany({
      where: {
        isActive: true,
        OR: [
          { isPublic: true },
          { isPublic: false, accountId: accId },
        ],
      },
      include: {
        account: true,
        attributeKeyCourt: true,
      },
    });
  },
  get: async (id: number, accId: number): Promise<any> => {
    return await database.attributeCourt.findFirst({
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
        attributeKeyCourt: true,
      },
    });
  },
};

export default attributeCourtHostService;
