-- CreateTable
CREATE TABLE `Tutor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `identificacion` INTEGER NOT NULL,
    `experticia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutor_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutorado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutorado_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asignatura` VARCHAR(191) NOT NULL,
    `numero_horas` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `tutorId` INTEGER NOT NULL,
    `tutoradoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `Tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutoradoId_fkey` FOREIGN KEY (`tutoradoId`) REFERENCES `Tutorado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
