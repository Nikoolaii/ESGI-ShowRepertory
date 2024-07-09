/*
  Warnings:

  - You are about to drop the column `saisonId` on the `Seen` table. All the data in the column will be lost.
  - You are about to drop the column `serieId` on the `Seen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Seen` DROP COLUMN `saisonId`,
    DROP COLUMN `serieId`;
