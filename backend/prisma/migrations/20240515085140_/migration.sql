/*
  Warnings:

  - You are about to alter the column `saisonId` on the `Seen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `episodeId` on the `Seen` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Seen` MODIFY `saisonId` INTEGER NOT NULL,
    MODIFY `episodeId` INTEGER NOT NULL;
