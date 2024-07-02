import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';

export const accountSeed = async (count: number) => {
  // seed account
  for (let index = 0; index < count; index++) {
    const acc = await database.account.create({
      data: {
        email: faker.internet.email(),
        password: '123',
        isActive: true,
      },
    });
    await userSeed(acc.id);
    logger.info('Seeding data account', acc);
  }
};

const userSeed = async (id: number) => {
  const data = await database.user.create({
    data: {
      name: faker.person.fullName(),
      dob: new Date(), // '+15551234567'
      numberPhone: faker.phone.number(),
      accountId: id,
    },
  });
  logger.info('Seeding data user', data);
};
