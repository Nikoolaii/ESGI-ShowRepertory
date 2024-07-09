/*
  Warnings:

  - You are about to drop the `Rate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rate` DROP FOREIGN KEY `Rate_userId_fkey`;

-- DropTable
DROP TABLE `Rate`;
