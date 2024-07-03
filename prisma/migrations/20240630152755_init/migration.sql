/*
  Warnings:

  - You are about to drop the column `checkout_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roomType` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `checkout_date`,
    DROP COLUMN `roomType`,
    ADD COLUMN `checkiout_date` VARCHAR(191) NULL,
    ADD COLUMN `room_type` VARCHAR(191) NULL,
    MODIFY `adult` VARCHAR(191) NULL,
    MODIFY `child` VARCHAR(191) NULL;
