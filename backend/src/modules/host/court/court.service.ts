import database from '../../../lib/db.server';
import { CourtPayload, CreateCourt } from './court.model';

const courtHostService = {
  create: async (payload: CreateCourt): Promise<object> => {
    return await database.court.create({
      data: {
        name: payload.name,
        branchesId: payload.branchesId,
        typeCourtId: payload.typeCourtId,
      },
    });
  },

  update: async (court: CourtPayload): Promise<any> => {
    return await database.court.update({
      where: {
        id: court.id,
      },
      data: {
        name: court.name,
        branchesId: court.branchesId,
        typeCourtId: court.typeCourtId,
      },
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
      include: {
        Branches: true,
        TypeCourt: true,
      },
    });
  },

  getDetail: async (id: number): Promise<any> => {
    return await database.court.findFirst({
      where: {
        id,
      },
      include: {
        Branches: true,
        TypeCourt: true,
      },
    });
  },

  delete: async (id: number): Promise<object> => {
    return await database.court.delete({
      where: { id },
    });
  },
};

export default courtHostService;
