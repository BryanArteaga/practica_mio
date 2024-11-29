import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../data/db';
import { eq, InferSelectModel } from 'drizzle-orm';
import { usuario } from '../data/schema';

type Usuario = InferSelectModel<typeof usuario>;

const JWT_SECRET = process.env.JWT_SECRET || 'secreta1';

const validacionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    console.log('Token no proporcionado');
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    return;
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
    if (err) {
      console.log('Error de verificación:', err);
      res.status(401).json({ mensaje: 'Token inválido' });
      return;
    }

    try {
      // Verificar si el usuario está activo
      const user = await db.select().from(usuario).where(eq(usuario.id, decoded.id)).execute();

      if (!user.length || user[0].estado !== 'Activo') {
        console.log('Token rechazado, usuario inactivo');
        res.status(401).json({ mensaje: 'Token rechazado, usuario inactivo' });
        return;
      }

      (req as any).user = user[0]; // Agregar usuario a la request
      next();
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
      return;
    }
  });
};

export default validacionMiddleware;