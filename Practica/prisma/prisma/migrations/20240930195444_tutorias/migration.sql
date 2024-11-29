-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identificacion" INTEGER NOT NULL,
    "experticia" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutorado" (
    "id" SERIAL NOT NULL,
    "identificacion" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tutorado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tutoria" (
    "id" SERIAL NOT NULL,
    "asignatura" TEXT NOT NULL,
    "numero_horas" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL,
    "tutorId" INTEGER NOT NULL,
    "tutoradoId" INTEGER NOT NULL,

    CONSTRAINT "Tutoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_identificacion_key" ON "Tutor"("identificacion");

-- CreateIndex
CREATE UNIQUE INDEX "Tutorado_identificacion_key" ON "Tutorado"("identificacion");

-- AddForeignKey
ALTER TABLE "Tutoria" ADD CONSTRAINT "Tutoria_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutoria" ADD CONSTRAINT "Tutoria_tutoradoId_fkey" FOREIGN KEY ("tutoradoId") REFERENCES "Tutorado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
