-- DropForeignKey
ALTER TABLE `ServiceOrder` DROP FOREIGN KEY `ServiceOrder_projectId_fkey`;

-- DropIndex
DROP INDEX `ServiceOrder_projectId_fkey` ON `ServiceOrder`;

-- AddForeignKey
ALTER TABLE `ServiceOrder` ADD CONSTRAINT `ServiceOrder_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
