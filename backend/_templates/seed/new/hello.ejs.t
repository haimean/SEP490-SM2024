---
to: seed/<%=name%>Seed.ts
---
import { faker } from '@faker-js/faker';
import database from '../src/lib/db.server';
import { logger } from '../src/utils/logger';
import { getRandomInt } from '../src/utils/number';

export const <%=name%>Seed = async (count: number) => {
  for (let index = 0; index < count; index++) {
    const data = await database.<%=name%>.create({
      data: {
       
      },
    });
    logger.info('Seeding data <%=name%>', data);
  }
};

