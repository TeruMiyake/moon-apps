-- AlterTable
ALTER TABLE `ItemNeed` ADD COLUMN `item1Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item1NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item2Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item2NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item3Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item3NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item4Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item4NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item5Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item5NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item6Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item6NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item7Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item7NowBuying` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `item8Memo` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `item8NowBuying` BOOLEAN NULL DEFAULT false;