import { eq } from 'drizzle-orm';
import { db } from './db';
import express from 'express';
import {tutor, tutorado, tutoria } from './schema'
import routertutor from './routes/tutor'
import routertutorado from './routes/tutorado'
import routertutoria from './routes/tutoria'
import { date } from 'drizzle-orm/mysql-core';


const port: number = 5000;
const app = express();

app.use(express.json());

app.use('/tutor', routertutor);
app.use('/tutorado', routertutorado);
app.use('/tutoria', routertutoria);

//funcion para editar tutor
export async function editaTutor(tutorId: number, newName: string, newIdentificacion: number, newExperticia: string) {
    await db.update(tutor).set({
      name: newName,
      identificacion: newIdentificacion,
      experticia: newExperticia
    }).where(eq(tutor.id, tutorId));
    
    return `Tutor con ID ${tutorId} ha sido actualizado.`;
}

//funcion para editar tutorado
export async function editaTutorado(tutoradoId: number, newName: string, newIdentificacion: number) {
    await db.update(tutorado).set({
      name: newName,
      identificacion: newIdentificacion,
    }).where(eq(tutorado.id, tutoradoId));
    
    return `Tutorado con ID ${tutoradoId} ha sido actualizado.`;
}

//funcion para editar tutoria
export async function editaTutoria(tutoriaId: number, newAsignatura: string, newNumero_horas: number, newFecha: Date, newHora: string) {
    await db.update(tutoria).set({
      asignatura: newAsignatura,
      numero_horas: newNumero_horas,
      fecha: newFecha,
      hora: newHora,
    }).where(eq(tutoria.id, tutoriaId));
    
    return `La tutoria ${tutoriaId} ha sido actualizado.`;
}

//funcion para eliminar tutor
export async function deleteTutor(id: number) {
    await db.delete(tutoria).where(eq(tutoria.tutorId, id));
    await db.delete(tutor).where(eq(tutor.id, id));

    return `Tutor con ID ${id} ha sido eliminado junto con sus tutorías.`;
}

  
//funcion para eliminar tutorado
export async function deleteTutorado(id: number) {
    await db.delete(tutoria).where(eq(tutoria.tutoradoId, id));
    await db.delete(tutorado).where(eq(tutorado.id, id));
    
    return `Tutorado con ID ${id} ha sido eliminado, junto con sus tutorías.`;
  }
  
//funcion para eliminar tutoria
  export async function deleteTutoria(tutoriaId: number) {
    await db.delete(tutoria).where(eq(tutoria.id, tutoriaId));

    return `Tutoria ${tutoriaId} a sido eliminados.`;
  }


  editaTutor(0, 'prueba edicion', 123123123, 'algebra baldor').then(mensaje => {
    console.log(mensaje);
  });

  editaTutoria(0, 'matematicas', 10, new Date (2035-0o2-0o2),'12:00AM').then(mensaje => {
    console.log(mensaje);
  });


deleteTutorado(0).then(mensaje => {
    console.log(mensaje);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


