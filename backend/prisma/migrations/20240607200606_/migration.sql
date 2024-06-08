/*
  Warnings:

  - A unique constraint covering the columns `[value,attributeKeyBranchesId]` on the table `AttributeBranches` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value,attributeKeyCourtId]` on the table `AttributeCourt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `AttributeBranches_value_attributeKeyBranchesId_key` ON `AttributeBranches`(`value`, `attributeKeyBranchesId`);

-- CreateIndex
CREATE UNIQUE INDEX `AttributeCourt_value_attributeKeyCourtId_key` ON `AttributeCourt`(`value`, `attributeKeyCourtId`);
