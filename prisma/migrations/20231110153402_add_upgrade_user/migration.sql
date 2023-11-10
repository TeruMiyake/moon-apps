/*
  Warnings:

  - Added the required column `userName` to the `Upgrade` table without a default value. This is not possible if the table is not empty.

*/

/*
    既に Upgrade にデータが入っており、userName カラムを単純に NOT NULL で追加するとエラーになるため、
    Prisma により生成されたマイグレーションファイルを修正している。
*/

-- AlterTable 一旦 NULL 許容で追加
ALTER TABLE `Upgrade` ADD COLUMN `userName` VARCHAR(191);

-- 作成済み Upgrade レコードの userName フィールドにデフォルト値 '' を追加する
UPDATE `Upgrade` SET `userName` = '';

-- AlterTable <- NOT NULL を追加
ALTER TABLE `Upgrade` MODIFY COLUMN `userName` VARCHAR(191) NOT NULL;