/*
  Warnings:

  - Added the required column `userName` to the `Upgrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Upgrade` ADD COLUMN `userName` VARCHAR(191) NOT NULL;
