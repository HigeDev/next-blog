/*
  Warnings:

  - You are about to drop the column `category` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `category`,
    ADD COLUMN `linkUrl` VARCHAR(191) NOT NULL DEFAULT 'https:/higesan.store';
