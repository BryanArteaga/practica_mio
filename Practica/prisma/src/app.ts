import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createTutor(name: string, identificacion: number, experticia: string) {
  const tutor = await prisma.tutor.create({
    data: {
      name,
      identificacion,
      experticia,
    },
  });
  return tutor;
}

async function createTutorado(name: string, identificacion: number) {
    const tutorado = await prisma.tutorado.create({
      data: {
        name,
        identificacion,
      },
    });
    return tutorado;
  }

async function createTutoria(asignatura: string, numero_horas: number, fecha: Date, hora: string, tutorId: number, tutoradoId: number) {
    const tutoria = await prisma.tutoria.create({
        data: {
            asignatura,
            numero_horas,
            fecha,
            hora,
            tutor: { connect: { id: tutorId } },
            tutorado: { connect: { id: tutoradoId } },
        },
    });
    return tutoria;
}

async function getAllTutores() {
    const tutores = await prisma.tutor.findMany();
    return tutores;
}

async function getAllTutorados() {
    const tutorados = await prisma.tutorado.findMany();
    return tutorados;
}

async function getAllTutorias() {
    const tutorias = await prisma.tutoria.findMany({
        include: {
            tutor: true,         
            tutorado: true,
        },
    });
    return tutorias;
}


async function main() {
  // Crear un nuevo tutor
  const nuevoTutor = await createTutor('Juan Pérez', 123456789, 'Matemáticas');
  console.log('Tutor creado:', nuevoTutor);

  // Crear un nuevo tutorado
  const nuevoTutorado = await createTutorado('Ana Gómez', 987654321);
  console.log('Tutorado creado:', nuevoTutorado);

  // Crear una nueva tutoría
  const nuevaTutoria = await createTutoria('Física', 2, new Date('2024-09-20'), '10:00 AM', nuevoTutor.id, nuevoTutorado.id);
  console.log('Tutoría creada:', nuevaTutoria);

  // Consultar todos los tutores
  const tutores = await getAllTutores();
  console.log('Lista de Tutores:', tutores);

  // Consultar todos los tutorados
  const tutorados = await getAllTutorados();
  console.log('Lista de Tutorados:', tutorados);

  // Consultar todas las tutorías
  const tutorias = await getAllTutorias();
  console.log('Lista de Tutorías:', tutorias);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });