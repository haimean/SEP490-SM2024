import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';

export const attributeCourtSeed = async (count: number) => {
  let accounts = await database.account.findMany();
  let attributeKeyBranches =
    await database.attributeKeyCourt.findMany();

  for (let index = 0; index < count; index++) {
    const data = await database.attributeCourt.create({
      data: {
        value: faker.lorem.word(),
        accountId: accounts[getRandomInt(accounts.length)]?.id,
        attributeKeyCourtId:
          attributeKeyBranches[
            getRandomInt(attributeKeyBranches.length)
          ]?.id,
      },
    });
    logger.info('Seeding data attributeCourt', data);
  }
};
