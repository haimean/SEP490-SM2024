import database from '../../../lib/db.server';
import { getObjectSignedUrl } from '../../../lib/s3';
import { getQueryPagination } from '../../index.service';

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
    const finalBranches = JSON.parse(JSON.stringify(branches));
    for (let index = 0; index < branches.length; index++) {
      if (finalBranches[index].image) {
        finalBranches[index].image = await getObjectSignedUrl(
          finalBranches[index].image
        );
        finalBranches[index].businessLicense =
          await getObjectSignedUrl(
            finalBranches[index].businessLicense
          );
      }
    }
    return finalBranches;
  },
  getTopThree: async () => {
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
      orderBy: {
        createdAt: 'desc',
      },
      ...getQueryPagination({
        page: 1,
        perPage: 3,
      }),
    });
    const finalBranches = JSON.parse(JSON.stringify(branches));
    for (let index = 0; index < branches.length; index++) {
      if (finalBranches[index].image) {
        finalBranches[index].image = await getObjectSignedUrl(
          finalBranches[index].image
        );
        finalBranches[index].businessLicense =
          await getObjectSignedUrl(
            finalBranches[index].businessLicense
          );
      }
    }
    return finalBranches;
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
      branches.businessLicense = await getObjectSignedUrl(
        branches.businessLicense
      );
    }
    return branches;
  },
};

export default branchesGuestService;
