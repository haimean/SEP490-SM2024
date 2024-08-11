import { PriceTypeCourt, Prisma, TypeCourt } from '@prisma/client';
import database from '../../../lib/db.server';
import { TypeCourtHostServiceCreatePayload } from './typeCourt.model';
import { DefaultArgs } from '@prisma/client/runtime/library';

const typeCourtHostService = {
  create: async (
    data: TypeCourtHostServiceCreatePayload
  ): Promise<TypeCourt> => {
    const {
      name,
      accountId,
      description,
      image,
      attributeCourtIds,
      priceTypeCourt,
    } = data;
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
    query.data.priceTypeCourt = {
      create: priceTypeCourt,
    };

    return await database.typeCourt.create(query);
  },

  update: async (
    id: number,
    data: TypeCourtHostServiceCreatePayload
  ): Promise<TypeCourt> => {
    const {
      name,
      accountId,
      description,
      image,
      attributeCourtIds,
      priceTypeCourt,
    } = data;
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
        set: [],
        connect: attributeCourt,
      };
    }
    console.log();

    if (priceTypeCourt) {
      query.data.priceTypeCourt = {
        set: [],
        create: priceTypeCourt,
      };
    }
    database.priceTypeCourt.deleteMany({
      where: {
        typeCourtId: id,
      },
    });

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
        attributeCourt: {
          include: {
            attributeKeyCourt: true,
          },
        },
        priceTypeCourt: true,
      },
    });
  },

  delete: async (
    id: number,
    accountId: number
  ): Promise<TypeCourt | null> => {
    await database.priceTypeCourt.deleteMany({
      where: { typeCourtId: id },
    });
    return await database.typeCourt.delete({
      where: {
        accountId,
        id,
      },
    });
  },

  getPrice: async (id: number): Promise<PriceTypeCourt[]> => {
    return await database.priceTypeCourt.findMany({
      where: {
        typeCourtId: id,
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  },
  getAll: async (accountId: number): Promise<TypeCourt[]> => {
    return await database.typeCourt.findMany({
      where: {
        accountId,
      },
      include: {
        attributeCourt: {
          include: {
            attributeKeyCourt: true,
          },
        },
        priceTypeCourt: true,
        court: true,
      },
    });
  },
  createPrice: async (id: number, data: any): Promise<any> => {
    const { endTime, price, startTime, times } = data;
    return await database.priceTypeCourt.create({
      data: {
        endTime,
        price,
        startTime,
        times,
        typeCourtId: id,
      },
    });
  },
  updatePrice: async (
    typeCourtId: number,
    data: any
  ): Promise<any> => {
    const { id, endTime, price, startTime, times } = data;
    return await database.priceTypeCourt.update({
      where: { id },
      data: {
        endTime,
        price,
        startTime,
        times,
        typeCourtId,
      },
    });
  },
  deletePrice: async (
    typeCourtId: number,
    data: any
  ): Promise<any> => {
    const { id } = data;
    return await database.priceTypeCourt.delete({
      where: { id, typeCourtId },
    });
  },

  replaceAttributeCourt: async (
    typeCourtId: number,
    oldAttributeCourtId: number,
    newAttributeCourtId: number
  ): Promise<TypeCourt> => {
    return await database.typeCourt.update({
      where: { id: typeCourtId },
      data: {
        attributeCourt: {
          disconnect: { id: oldAttributeCourtId },
          connect: { id: newAttributeCourtId },
        },
      },
      include: {
        attributeCourt: true,
      },
    });
  },
};

export default typeCourtHostService;
