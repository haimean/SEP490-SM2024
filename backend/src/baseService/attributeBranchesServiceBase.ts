import database from '../lib/db.server';

const attributeBranchesServiceBase = {
  findById: async (id: number) => {
    return await database.attributeBranches.findFirst({
      where: { id },
    });
  },
};
export default attributeBranchesServiceBase;
