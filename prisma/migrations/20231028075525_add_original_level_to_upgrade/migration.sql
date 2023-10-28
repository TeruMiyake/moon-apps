/*
  Warnings:

  - Added the required column `originalLevel` to the `Upgrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Upgrade` ADD COLUMN `originalLevel` INTEGER NOT NULL;
