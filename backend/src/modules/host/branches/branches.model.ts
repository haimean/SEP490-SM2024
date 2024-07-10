import { AddressBranch, Branches } from '@prisma/client';

export type BranchesHostServiceCreate = Omit<
  Branches,
  'id' | 'createdAt' | 'updatedAt'
>;

export type AddressBranchHostServiceCreate = Omit<
  AddressBranch,
  'id' | 'createdAt' | 'updatedAt' | 'branchesId'
>;
