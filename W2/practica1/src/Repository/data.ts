interface ITutor {
  id: number,
  nombre: string,
  identificacion: number,
  experticia: string
}

interface Itutorado {
  id: number,
  nombre: string,
  identificacion: number
}

interface Itutoria {
  id: number,
  asignatura: string,
  numero_horas: number,
  fecha: Date,
  hora: string,
  tutorID: number,
  tutoradoID: number
}

const Tutor: ITutor[]= [
  {id: 1, nombre: 'albaro', identificacion: 1364737578, experticia:'Desarrollo de software y patrones de diseño'},
  {id: 2, nombre: 'Alex', identificacion: 1384834793, experticia:'Administracion y optimizacion de sistemas de bases de datos'},
  {id: 3, nombre: 'Bryan', identificacion: 1389048948, experticia:'machine learning y deep learning'},
  {id: 4, nombre: 'Steven', identificacion: 1904389389, experticia:'comercio internacional y analisis economico global'},
  {id: 5, nombre: 'Javier', identificacion: 1389438934, experticia:'diseño e implementacion de redes y seguridad en telecomunicaciones'}  
]

const Tutorado: Itutorado[]= [
  {id: 1, nombre: 'Kevin', identificacion: 1364738475},
  {id: 2, nombre: 'Ronald', identificacion: 1364738475},
  {id: 3, nombre: 'Andres', identificacion: 1364738475},
  {id: 4, nombre: 'Paco', identificacion: 1364738475},
  {id: 5, nombre: 'Jose', identificacion: 1364738475},
]

const Tutoria: Itutoria[]= [
  {id: 1, asignatura: 'Programacion Orientada a objetos', numero_horas: 2, fecha: new Date ('1/9/2024'), hora: '10:00Am', tutorID: 1, tutoradoID: 1},
  {id: 2, asignatura: 'Bases de datos', numero_horas: 1, fecha: new Date ('12/9/2024'), hora: '09:00Am', tutorID: 2, tutoradoID: 2},
  {id: 3, asignatura: 'Inteligencia artificial', numero_horas: 2, fecha: new Date ('1/10/2024'), hora: '12:00Pm', tutorID: 3, tutoradoID: 3},
  {id: 4, asignatura: 'Economia internacional', numero_horas: 1, fecha:new Date ('10/10/2024'), hora: '15:00Pm', tutorID: 4, tutoradoID: 4},
  {id: 5, asignatura: 'Redes y telecomunicaciones', numero_horas: 2, fecha: new Date ('12/11/2024'), hora: '18:00Pm', tutorID: 5, tutoradoID: 5}
]

export {
  Tutor,
  Tutorado,
  Tutoria,
  ITutor,
  Itutorado,
  Itutoria
}