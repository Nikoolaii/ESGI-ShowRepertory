/*
  Warnings:

  - You are about to alter the column `serieId` on the `Favorite` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `serieId` on the `Rate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `serieId` on the `Seen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Favorite` MODIFY `serieId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Rate` MODIFY `serieId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Seen` MODIFY `serieId` INTEGER NOT NULL;
