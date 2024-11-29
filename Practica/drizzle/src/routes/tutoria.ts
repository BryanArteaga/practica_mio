import { Router, Request, Response } from 'express';
import { editaTutoria, deleteTutoria } from '../app'; // Importas los métodos CRUD
import { db } from '../db';
import { tutoria } from '../schema';

const routertutoria = Router();

// Ruta para obtener tutorías
routertutoria.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(tutoria);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tutorías' });
    }
});

// Ruta para crear una nueva tutoría
routertutoria.post('/', async (req, res) => {
    const { asignatura, numero_horas, fecha, hora, tutorId, tutoradoId } = req.body;

    try {
        const nuevaTutoria = await db
            .insert(tutoria)
            .values({
                asignatura,
                numero_horas,
                fecha: new Date(fecha),
                hora: String(hora),
                tutorId,
                tutoradoId
            })
            .returning(); 

        res.status(201).json({ 
            message: 'Tutoría creada exitosamente', 
            nuevaTutoria: nuevaTutoria[0]
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la tutoría', details: error.message });
        } else {
            res.status(500).json({ error: 'Error desconocido al crear la tutoría' });
        }
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
