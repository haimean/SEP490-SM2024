import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';

export const attributeKeyCourtSeed = async (count: number) => {
  for (let index = 0; index < count; index++) {
    const data = await database.attributeKeyCourt.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.words(20),
      },
    });
    logger.info('Seeding data attributeKeyCourt', data);
  }
};
