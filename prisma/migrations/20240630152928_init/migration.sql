/*
  Warnings:

  - You are about to drop the column `checkiout_date` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `checkiout_date`,
    ADD COLUMN `checkout_date` VARCHAR(191) NULL;
