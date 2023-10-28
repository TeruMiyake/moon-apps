/*
  Warnings:

  - Added the required column `typeId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/

/*
    既に Item にデータが入っているが、新規挿入する typeId カラムは NOT NULL としたい。
    このため、Prisma により生成されたマイグレーションファイルを修正している。
    具体的には、Item に typeId を Nullable で追加したあと、既存の Item レコードに typeId を追加するためのデフォルト値となる ItemType レコードを作成。そのデフォルト値を既存している。
*/

-- CreateTable
CREATE TABLE `ItemType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equippable` BOOLEAN NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable <- NOT NULL を削除
ALTER TABLE `Item` ADD COLUMN `typeId` INTEGER;

-- 作成済み Item レコードに追加するためのデフォルト値とする ItemType レコードを作成し、
-- そのデフォルト値を既存のレコードに追加する
INSERT INTO `ItemType` (`equippable`, `name`) VALUES (1, '武器');
UPDATE `Item` SET `typeId` = (SELECT `id` FROM `ItemType` WHERE `name` = '武器');

-- AlterTable <- NOT NULL を追加
ALTER TABLE `Item` MODIFY COLUMN `typeId` INTEGER NOT NULL;

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
