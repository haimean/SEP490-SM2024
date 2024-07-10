import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';

export const courtSeed = async (count: number) => {
  let branches = await database.branches.findMany();
  let typeCourt = await database.typeCourt.findMany();
  for (let index = 0; index < count; index++) {
    const data = await database.court.create({
      data: {
        name: faker.lorem.word(20),
        branchesId: branches[getRandomInt(branches.length)]?.id,
        typeCourtId: typeCourt[getRandomInt(typeCourt.length)]?.id,
      },
    });
    logger.info('Seeding data court', data);
  }
};
