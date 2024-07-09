/*
  Warnings:

  - Added the required column `serieType` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serieType` to the `Rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Favorite` ADD COLUMN `serieType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Rate` ADD COLUMN `serieType` VARCHAR(191) NOT NULL;
