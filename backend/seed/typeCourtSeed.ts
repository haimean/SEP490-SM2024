import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';
import { AttributeBranches } from '@prisma/client';

export const typeCourtSeed = async (count: number) => {
  let attributeBranches = await database.attributeBranches.findMany();
  let user = await database.user.findMany();
  for (let index = 0; index < count; index++) {
    const data = await database.typeCourt.create({
      data: {
        name: faker.lorem.words(3),
        userId: user[await getRandomInt(user.length)]?.id,
        description: faker.lorem.words(20),
        image: faker.lorem.words(10),
        attributeCourt: {
          connect: [
            {
              id: attributeBranches[0]?.id,
            },
            {
              id: attributeBranches[1]?.id,
            },
            {
              id: attributeBranches[2]?.id,
            },
          ],
        },
      },
    });
    logger.info('Seeding data typeCourt', data);
  }
};
