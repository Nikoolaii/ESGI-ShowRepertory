/*
  Warnings:

  - Added the required column `serieId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serieType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serieType` to the `Seen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `serieId` INTEGER NOT NULL,
    ADD COLUMN `serieType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Seen` ADD COLUMN `serieType` VARCHAR(191) NOT NULL;
