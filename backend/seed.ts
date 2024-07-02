import { faker } from '@faker-js/faker';
import database from './src/lib/db.server';
import { Account } from '@prisma/client';
import { accountSeed } from './seed/accounSeed';
import { getRandomInt } from './src/utils/number';
import { attributeKeyBranchesSeed } from './seed/attributeKeyBranchesSeed';
import { attributeKeyCourtSeed } from './seed/attributeKeyCourtSeed';
import { attributeBranchesSeed } from './seed/attributeBranchesSeed';
import { attributeCourtSeed } from './seed/attributeCourtSeed';
import { typeCourtSeed } from './seed/typeCourtSeed';

const seedData = async () => {
  await accountSeed(10);
  await attributeKeyBranchesSeed(10);
  await attributeBranchesSeed(10);
  await attributeKeyCourtSeed(10);
  await attributeCourtSeed(10);
  await typeCourtSeed(10);
  //info: update seed
};

seedData();
