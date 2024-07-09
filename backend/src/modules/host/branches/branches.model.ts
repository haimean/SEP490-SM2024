import { AddressBranch, Branches } from '@prisma/client';

export type BranchesHostServiceCreate = Omit<
  Branches,
  'id' | 'createdAt' | 'updatedAt' | 'isDelete'
>;

export type AddressBranchHostServiceCreate = Omit<
  AddressBranch,
  'id' | 'createdAt' | 'updatedAt' | 'branchesId'
>;
