/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `nic` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,
    `checking_date` VARCHAR(191) NULL,
    `checkout_date` VARCHAR(191) NULL,
    `adult` VARCHAR(191) NULL,
    `child` VARCHAR(191) NULL,
    `room_type` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
