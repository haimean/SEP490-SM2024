import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';

export const attributeBranchesSeed = async (count: number) => {
  let accounts = await database.account.findMany();
  let attributeKeyBranches =
    await database.attributeKeyBranches.findMany();

  for (let index = 0; index < count; index++) {
    const data = await database.attributeBranches.create({
      data: {
        value: faker.lorem.word(),
        accountId: accounts[getRandomInt(accounts.length)]?.id,
        attributeKeyBranchesId:
          attributeKeyBranches[
            getRandomInt(attributeKeyBranches.length)
          ]?.id,
      },
    });
    logger.info('Seeding data attributeBranches', data);
  }
};
