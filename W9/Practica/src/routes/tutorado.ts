    import { Router } from 'express';
    import { editaTutorado, deleteTutorado } from '../app';
    import { db } from '../data/db';
    import { eq } from 'drizzle-orm'
    import { tutorado } from '../data/schema';

    const routertutorado = Router();

    // Consultar todos los tutorados
    routertutorado.get('/', async (req, res) => {
        try {
            const tutorados = await db.select().from(tutorado);
            res.json(tutorados);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los tutorados' });
        }
    });

    // Consultar un tutoradp por id
    routertutorado.get('/:id', async (req, res) => {
        const result = await db.select().from(tutorado).where(eq(tutorado.id, Number(req.params.id)));
        res.json(result);
    });

    // Crear un nuevo tutorado
    routertutorado.post('/', async (req, res) => {
        const { name, identificacion } = req.body;

        try {
            const nuevoTutorado = await db.insert(tutorado).values({
                name: name,
                identificacion: identificacion,
            });
            res.status(201).json({ message: 'Tutorado creado exitosamente',
                tutorado: {
                    name,
                    identificacion
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el tutorado' });
        }
    });

    // Modificar un tutorado existente
    routertutorado.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { name, identificacion} = req.body;

        try {
            const mensaje = await editaTutorado(Number(id), name, identificacion);
            res.json({ message: mensaje });
        } catch (error) {
            res.status(500).json({ error: 'Error al editar el tutorado' });
        }
    });

    // Eliminar un tutor existente
    routertutorado.delete('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const mensaje = await deleteTutorado(Number(id));
            res.json({ message: mensaje });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el tutorado' });
        }
    });

    export default routertutorado;
