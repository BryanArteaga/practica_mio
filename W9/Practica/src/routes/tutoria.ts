import { Router, Request, Response } from 'express';
import { editaTutoria, deleteTutoria } from '../app';
import { dbPostgres, dbMySQL } from '../data/db';
import { eq } from 'drizzle-orm'
import { tutoria } from '../data/shemaMysql';
import { TutoriaRepository } from '../infrastructure/repositories/tutoriaRepository';
import { validateTutoriaDTO } from '../domain/dtos/tutoriaDto';


const routertutoria = Router();

// Obtener todas las tutorías
routertutoria.get('/', async (req: Request, res: Response) => {
    try {
        const result = await TutoriaRepository.findAll();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tutorías' });
    }
});

// Consultar un tutoria por id
routertutoria.get('/:id', async (req, res) => {
    const result = await dbMySQL.select().from(tutoria).where(eq(tutoria.id, Number(req.params.id)));
    res.json(result);
});

// Crear una nueva tutoría
routertutoria.post('/', async (req: any,res: any) => {
    const data = req.body;
    if (!validateTutoriaDTO(data)) {
        return res.status(400).json({ error: 'Datos de tutoría no válidos' });
    }

    try {
        const nuevaTutoria = await TutoriaRepository.createTutoria(data);
        res.status(201).json({ message: 'Tutoría creada exitosamente', nuevaTutoria });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tutoría' });
    }
});

// Ruta para modificar una tutoría existente
routertutoria.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { asignatura, numero_horas, fecha, hora } = req.body;

    try {
        const mensaje = await editaTutoria(Number(id), asignatura, numero_horas, new Date(fecha), hora);
        res.json({ message: mensaje });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: 'Error al editar la tutoría', details: error.message });
        } else {
            res.status(500).json({ error: 'Error desconocido al editar la tutoría' });
        }
    }
});

// Ruta para eliminar una tutoría existente
routertutoria.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const mensaje = await deleteTutoria(Number(id));
        res.json({ message: mensaje });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tutoría' });
    }
});

export default routertutoria;
