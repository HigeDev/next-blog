-- AlterTable
ALTER TABLE `project` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `project_skill` ADD COLUMN `docker` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Inbox` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL DEFAULT 'no subject',
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inbox` ADD CONSTRAINT `Inbox_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
