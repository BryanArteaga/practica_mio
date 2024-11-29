import { Router } from 'express';
import { editaTutor, deleteTutor } from '../app';
import { db } from '../data/db';
import { eq } from 'drizzle-orm'
import { tutor } from '../data/schema';


const routertutor = Router();
// Consultar todos los tutores
routertutor.get('/', async (req, res) => {
    try {
        const tutores = await db.select().from(tutor);
        res.json(tutores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tutores' });
    }
});

// Consultar un tutor por id
routertutor.get('/:id', async (req, res) => {
    const result = await db.select().from(tutor).where(eq(tutor.id, Number(req.params.id)));
    res.json(result);
});

// Crear un nuevo tutor
routertutor.post('/', async (req, res) => {
    const { name, identificacion, experticia } = req.body;

    try {
        const nuevoTutor = await db.insert(tutor).values({
            name: name,
            identificacion: identificacion,
            experticia: experticia
        });
        res.status(201).json({ message: 'Tutor creado exitosamente',
            tutor: {
                name,
                identificacion,
                experticia
            }
         });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tutor' });
    }
});

// Modificar un tutor existente
routertutor.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, identificacion, experticia } = req.body;

    try {
        const mensaje = await editaTutor(Number(id), name, identificacion, experticia);
        res.json({ message: mensaje });
    } catch (error) {
        console.error('Error al actualizar tutor:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el tutor' });
    }
});

// Eliminar un tutor existente
routertutor.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const mensaje = await deleteTutor(Number(id));
        res.json({ message: mensaje });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tutor' });
    }
});

export default routertutor;
