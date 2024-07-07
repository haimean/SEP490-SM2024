import { accountSeed } from './seed/accounSeed';
import { attributeKeyBranchesSeed } from './seed/attributeKeyBranchesSeed';
import { attributeKeyCourtSeed } from './seed/attributeKeyCourtSeed';
import { attributeBranchesSeed } from './seed/attributeBranchesSeed';
import { attributeCourtSeed } from './seed/attributeCourtSeed';
import { typeCourtSeed } from './seed/typeCourtSeed';
import { courtSeed } from './seed/courtSeed';
import { branchSeed } from './seed/branchSeed';

const seedData = async () => {
  await accountSeed(10);
  await attributeKeyBranchesSeed(10);
  await attributeBranchesSeed(10);
  await attributeKeyCourtSeed(10);
  await attributeCourtSeed(10);
  await typeCourtSeed(10);
  await courtSeed(10);
  await branchSeed(10);
  //info: update seed
};

seedData();
