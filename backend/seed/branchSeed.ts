import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';

export const branchSeed = async (count: number) => {
  let accounts = await database.account.findMany();
  for (let index = 0; index < count; index++) {
    const data = await database.branches.create({
      data: {
        name: faker.lorem.word(20),
        accountId: accounts[getRandomInt(accounts.length)]?.id,
        // addressLongitude: faker.location.longitude().toString(),
        // addressLatitude: faker.location.latitude().toString(),
        image: faker.image.abstract(1234, 2345),
        description: faker.lorem.words(20),
        businessLicense: faker.lorem.words(20),
        closingHours: faker.date.anytime(),
        openingHours: faker.date.anytime(),
        phone: faker.phone.number(),
      },
    });
    logger.info('Seeding data court', data);
  }
};
