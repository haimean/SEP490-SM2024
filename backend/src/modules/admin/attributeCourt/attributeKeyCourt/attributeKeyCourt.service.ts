import { AttributeKeyCourtPayLoad } from './attributeKeyCourt.model';
import database from '../../../../lib/db.server';

const attributeKeyCourtService = {
  create: async (
    payload: AttributeKeyCourtPayLoad
  ): Promise<object> => {
    return await database.attributeKeyCourt.create({
      data: payload,
    });
  },
  update: async (
    id: number,
    payload: AttributeKeyCourtPayLoad
  ): Promise<object> => {
    return await database.attributeKeyCourt.update({
      where: {
        id: id,
      },
      data: { name: payload.name },
    });
  },
  remove: async (id: number) => {
    return await database.attributeKeyCourt.delete({
      where: {
        id: id,
      },
    });
  },
  getAll: async (): Promise<any> => {
    return await database.attributeKeyCourt.findMany();
  },

  get: async (id: number): Promise<object> => {
    return (
      (await database.attributeKeyCourt.findFirst({
        where: {
          id: id,
        },
      })) ?? {}
    );
  },
};

export default attributeKeyCourtService;
