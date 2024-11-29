// dtos/tutoriaDto.ts
export interface TutoriaDTO {
  asignatura: string;
  numero_horas: number;
  fecha: string; 
  hora: string;
  tutorId: number;
  tutoradoId: number;
}


export function validateTutoriaDTO(data: any): data is TutoriaDTO {
  return (
      typeof data.asignatura === 'string' &&
      typeof data.numero_horas === 'number' &&
      !isNaN(Date.parse(data.fecha)) &&
      typeof data.hora === 'string' &&
      typeof data.tutorId === 'number' &&
      typeof data.tutoradoId === 'number'
  );
}
