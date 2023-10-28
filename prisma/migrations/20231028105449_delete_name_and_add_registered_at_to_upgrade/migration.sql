/*
  Warnings:

  - You are about to drop the column `name` on the `Upgrade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Upgrade` DROP COLUMN `name`,
    ADD COLUMN `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
