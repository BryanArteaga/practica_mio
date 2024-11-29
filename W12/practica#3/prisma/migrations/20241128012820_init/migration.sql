-- CreateTable
CREATE TABLE `Tutor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `experticia` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutor_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutorado` (
    `id` VARCHAR(191) NOT NULL,
    `identificacion` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tutorado_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tutoria` (
    `id` VARCHAR(191) NOT NULL,
    `asignatura` VARCHAR(191) NOT NULL,
    `numero_horas` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,
    `tutorId` VARCHAR(191) NOT NULL,
    `tutoradoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `Tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tutoria` ADD CONSTRAINT `Tutoria_tutoradoId_fkey` FOREIGN KEY (`tutoradoId`) REFERENCES `Tutorado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
