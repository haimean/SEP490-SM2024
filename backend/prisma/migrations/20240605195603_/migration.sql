/*
  Warnings:

  - You are about to drop the `attributebranche` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attributekeybranche` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attributebranche` DROP FOREIGN KEY `AttributeBranche_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `attributebranche` DROP FOREIGN KEY `AttributeBranche_attributeKeyBrancheId_fkey`;

-- DropForeignKey
ALTER TABLE `attributebranche` DROP FOREIGN KEY `AttributeBranche_attributeKeyCourtId_fkey`;

-- DropTable
DROP TABLE `attributebranche`;

-- DropTable
DROP TABLE `attributekeybranche`;

-- CreateTable
CREATE TABLE `AttributeKeyBranches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `AttributeKeyBranches_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributeBranches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `accountId` INTEGER NOT NULL,
    `attributeKeyBranchesId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AttributeBranches` ADD CONSTRAINT `AttributeBranches_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributeBranches` ADD CONSTRAINT `AttributeBranches_attributeKeyBranchesId_fkey` FOREIGN KEY (`attributeKeyBranchesId`) REFERENCES `AttributeKeyBranches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
