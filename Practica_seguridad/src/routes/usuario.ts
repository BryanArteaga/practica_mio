import { Router, Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { usuario } from '../schema';
import { eq } from 'drizzle-orm';
import { db } from '../db';

const routerUsuario = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta1';

// Registrar un nuevo usuario
routerUsuario.post('/registrar', async (req: Request, res: Response) => {
    const { nombre, clave } = req.body;
    const hash = await bcrypt.hash(clave, 10);

    try {
        // Insertar el nuevo usuario en la base de datos
        const newUser = await db.insert(usuario).values({
            nombre,
            clave: hash,
            estado: 'Activo',
        }).returning();

        const token = jwt.sign(
            { id: newUser[0].id, nombre: newUser[0].nombre, estado: newUser[0].estado },
            JWT_SECRET
        );

        res.status(201).json({ 
            id: newUser[0].id, 
            nombre: newUser[0].nombre, 
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// Iniciar sesión
routerUsuario.post('/login', async (req: any, res: any) => {
    try {
        const { nombre, clave } = req.body;

        const user = await db.select().from(usuario).where(eq(usuario.nombre, nombre)).execute();
        if (!user.length || !(await bcrypt.compare(clave, user[0].clave))) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user[0].id, nombre: user[0].nombre, estado: user[0].estado }, JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

export default routerUsuario;
