/*
  Warnings:

  - Added the required column `typeId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `typeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ItemType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equippable` BOOLEAN NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UpgradeResultType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Upgrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `triedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rankId` INTEGER NOT NULL,
    `resultTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `ItemType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Upgrade` ADD CONSTRAINT `Upgrade_rankId_fkey` FOREIGN KEY (`rankId`) REFERENCES `ItemRank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Upgrade` ADD CONSTRAINT `Upgrade_resultTypeId_fkey` FOREIGN KEY (`resultTypeId`) REFERENCES `UpgradeResultType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
