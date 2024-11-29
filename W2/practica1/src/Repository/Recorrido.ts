import {Tutor, Tutorado, Tutoria} from './data'

function recorrerTutor (){
  Tutor.forEach(tutor => {
    console.log(`Tutor: ${tutor.nombre},Identificacion: ${tutor.identificacion} ,Experticia: ${tutor.experticia}`);
  });
}

function recorrerTutorado (){
  for (const tutorado of Tutorado) {
    console.log(`Tutorado: ${tutorado.nombre}, Identificación: ${tutorado.identificacion}`);
  };
}

function recorrerTutorias (){
  for(const index in Tutoria) {
    const tutoria = Tutoria[index];
    console.log(`Asignatura: ${tutoria.asignatura}, Numero de horas: ${tutoria.numero_horas},Hora: ${tutoria.hora} ,Fecha: ${tutoria.fecha.toLocaleDateString()}`);
  };
}

export {
  recorrerTutor, 
  recorrerTutorado, 
  recorrerTutorias
}

