import { AttributeBranches } from '@prisma/client';
import attributeBranchesService from './attributeBranches.service';
import database from '../../../lib/db.server';

describe('test admin attribute Branches Service ', () => {
  it('responds with "Welcome to unit testing guide for nodejs, typescript and express!', async () => {
    const attributeKeyBranches =
      await database.attributeKeyBranches.findMany({
        select: { id: true },
      });
    const account = await database.account.findMany({
      select: { id: true },
    });
    const attributeBranches: AttributeBranches = {
      id: account[0].id,
      isPublic: true,
      accountId: 1,
      value: 'hai',
      isActive: true,
      attributeKeyBranchesId: attributeKeyBranches[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const response = await attributeBranchesService.create(
      attributeBranches
    );
    expect(response).toBeTruthy();
  });
});
