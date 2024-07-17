import database from '../lib/db.server';

const attributeBranchesServiceBase = {
  findById: async (id: number) => {
    return await database.attributeBranches.findFirst({
      where: { id },
      include: {
        account: true,
      },
    });
  },
};
export default attributeBranchesServiceBase;
