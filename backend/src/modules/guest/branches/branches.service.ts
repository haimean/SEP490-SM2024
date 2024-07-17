import database from '../../../lib/db.server';
import { getObjectSignedUrl } from '../../../lib/s3';

const branchesGuestService = {
  getAll: async () => {
    const branches = await database.branches.findMany({
      where: {
        isAccept: true,
        isDelete: false,
      },
      include: {
        address: true,
        court: { include: { TypeCourt: true } },
        attributeBranches: {
          include: {
            attributeKeyBranches: true,
          },
        },
      },
    });
    branches.forEach(async (item, index) => {
      if (item.image) {
        branches[index].image = await getObjectSignedUrl(item.image);
      }
    });
    return branches;
  },
  get: async (id: number): Promise<any> => {
    const branches = await database.branches.findUnique({
      where: {
        id,
        isAccept: true,
        isDelete: false,
      },
      include: {
        account: {
          include: {
            user: true,
          },
        },
        address: true,
        court: { include: { TypeCourt: true } },
        attributeBranches: {
          include: {
            attributeKeyBranches: true,
          },
        },
      },
    });
    if (branches && branches.image) {
      branches.image = await getObjectSignedUrl(branches.image);
    }
    return branches;
  },
};

export default branchesGuestService;
