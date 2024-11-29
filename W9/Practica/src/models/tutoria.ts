export class tutoria {
    constructor(
      public id: number,
      public asignatura: string,
      public numero_horas: number,
      public fecha: Date,
      public hora: string,
      public tutorId: number,
      public tutoradoId: number
    ) {}
  }
  