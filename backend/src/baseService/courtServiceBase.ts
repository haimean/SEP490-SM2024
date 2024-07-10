import database from '../lib/db.server';

const courtServiceBase = {
  findById: async (id: number) => {
    return await database.court.findFirst({
      where: { id },
    });
  },
};
export default courtServiceBase;
