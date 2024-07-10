/*
  Warnings:

  - Added the required column `serieId` to the `Seen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Seen` ADD COLUMN `serieId` INTEGER NOT NULL;
