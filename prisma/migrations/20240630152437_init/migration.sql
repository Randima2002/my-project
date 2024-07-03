/*
  Warnings:

  - You are about to drop the column `checkiout_date` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `room_type` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `checking_date` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `adult` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `child` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `checkiout_date`,
    DROP COLUMN `room_type`,
    ADD COLUMN `checkout_date` DATETIME(3) NULL,
    ADD COLUMN `roomType` VARCHAR(191) NULL,
    MODIFY `checking_date` DATETIME(3) NULL,
    MODIFY `adult` INTEGER NULL,
    MODIFY `child` INTEGER NULL;
