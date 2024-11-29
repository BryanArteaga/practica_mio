/*
  Warnings:

  - The primary key for the `tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tutorado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tutoria` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `tutoria` DROP FOREIGN KEY `Tutoria_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `tutoria` DROP FOREIGN KEY `Tutoria_tutoradoId_fkey`;

-- AlterTable
ALTER TABLE `tutor` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tutorado` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tutoria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `tutorId` VARCHAR(191) NOT NULL,
    MODIFY `tutoradoId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `Tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutoradoId_fkey` FOREIGN KEY (`tutoradoId`) REFERENCES `Tutorado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
