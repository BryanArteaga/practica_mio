import { z } from 'zod';

export const TutoriaDTO = z.object({
    tutorId: z.number(),
    tutoradoId: z.number(),
    asignatura: z.string(),
    numero_horas: z.number(),
    fecha: z.string().transform((val) => new Date(val)), 
    hora: z.string(),
});