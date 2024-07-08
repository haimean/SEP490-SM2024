import database from '../../lib/db.server';

const courtService = {
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
};

export default courtService;
