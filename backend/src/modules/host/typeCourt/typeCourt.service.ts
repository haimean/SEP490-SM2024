import { Prisma, TypeCourt } from '@prisma/client';
import database from '../../../lib/db.server';
import { TypeCourtHostServiceCreatePayload } from './typeCourt.model';
import { DefaultArgs } from '@prisma/client/runtime/library';

const typeCourtHostService = {
  create: async (
    data: TypeCourtHostServiceCreatePayload
  ): Promise<TypeCourt> => {
    const { name, accountId, description, image, attributeCourtIds } =
      data;
    const query: Prisma.TypeCourtCreateArgs<DefaultArgs> = {
      data: {
        accountId,
        name,
      },
    };
    if (description) {
      query.data.description = description;
    }
    if (image) {
      query.data.image = image;
    }
    if (attributeCourtIds) {
      const attributeCourt = attributeCourtIds.map((item) => {
        return {
          id: item,
        };
      });
      query.data.attributeCourt = {
        connect: attributeCourt,
      };
    }

    return await database.typeCourt.create(query);
  },

  update: async (
    id: number,
    data: TypeCourtHostServiceCreatePayload
  ): Promise<TypeCourt> => {
    const { name, accountId, description, image, attributeCourtIds } =
      data;
    const query: Prisma.TypeCourtUpdateArgs<DefaultArgs> = {
      where: { id, accountId },
      data: {
        name: name,
      },
    };

    if (description) {
      query.data.description = description;
    }

    if (image) {
      query.data.image = image;
    }

    if (attributeCourtIds) {
      const attributeCourt = attributeCourtIds.map((item) => {
        return {
          id: item,
        };
      });
      query.data.attributeCourt = {
        connect: attributeCourt,
      };
    }

    return await database.typeCourt.update(query);
  },

  getByName: async (
    name: string,
    accountId: number
  ): Promise<TypeCourt | null> => {
    return await database.typeCourt.findFirst({
      where: {
        accountId,
        name,
      },
    });
  },
  get: async (
    id: number,
    accountId: number
  ): Promise<TypeCourt | null> => {
    return await database.typeCourt.findFirst({
      where: {
        accountId,
        id,
      },
      include: {
        attributeCourt: true,
      },
    });
  },
  getAll: async (accountId: number): Promise<TypeCourt[]> => {
    return await database.typeCourt.findMany({
      where: {
        accountId,
      },
      include: {
        attributeCourt: true,
      },
    });
  },
};

export default typeCourtHostService;
