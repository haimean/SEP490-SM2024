import { AttributeCourt, AttributeKeyCourt } from '@prisma/client';
import database from '../../../lib/db.server';

const removeIdInObject = (data: any) => {
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const attributeCourtService = {
  create: async (payload: AttributeCourt): Promise<object> => {
    return await database.attributeCourt.create({
      data: removeIdInObject(payload),
    });
  },
  update: async (payload: AttributeCourt): Promise<object> => {
    return await database.attributeCourt.update({
      where: {
        id: payload.id,
      },
      data: removeIdInObject(payload),
    });
  },
  remove: async (id: number) => {
    return await database.attributeCourt.delete({
      where: {
        id: id,
      },
    });
  },
  getAll: async (): Promise<any> => {
    return await database.attributeCourt.findMany({
      include: {
        account: true,
        attributeKeyCourt: true,
      },
    });
  },

  get: async (id: number): Promise<object> => {
    return (
      (await database.attributeCourt.findFirst({
        where: {
          id: id,
        },
        include: {
          account: true,
          attributeKeyCourt: true,
        },
      })) ?? {}
    );
  },
  findAttributeKeyCourt: async (
    id: number
  ): Promise<AttributeKeyCourt | null> => {
    return await database.attributeKeyCourt.findFirst({
      where: {
        id,
      },
    });
  },
};

export default attributeCourtService;
