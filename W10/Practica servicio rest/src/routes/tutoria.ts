import express, { Request, Response } from "express";
import { eq, desc } from 'drizzle-orm'; 
import { db } from "../db/connection";
import { tutoria } from "../db/Entities";
import { TutoriaDTO } from "../Dtos"; 
import * as z from "zod";

const router = express.Router();

// Ruta GET para obtener todas las tutorías
router.get("/", async (req: Request, res: Response) => {
    try {
        const tutorias = await db.select().from(tutoria);
        res.json(tutorias);
    } catch (error) {
        console.error("Error fetching tutorias:", error);
        res.status(500).json({ message: "Error fetching tutorias." });
    }
});

// Ruta POST para agregar una nueva tutoría
router.post("/", async (req: Request, res: any) => {
    try {
        const newTutoria = TutoriaDTO.parse(req.body);
        
        // Inserta la nueva tutoría en la base de datos
        await db.insert(tutoria).values(newTutoria);
        const insertedTutoria = await db.select().from(tutoria).orderBy(desc(tutoria.id)).limit(1);

        res.status(201).json({
            message: "Tutoría agregada exitosamente.",
            tutoria: insertedTutoria[0]
        });
    } catch (error) {
        // Manejo de errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error inserting tutoria:", error);
        res.status(500).json({ message: "Error inserting tutoria." });
    }
});

// Ruta PATCH para actualizar una tutoría existente
router.patch("/:id", async (req: Request, res: any) => {
    try {
        // Validar y parsear los datos del cuerpo de la solicitud
        const updatedData = TutoriaDTO.partial().parse(req.body);
        
        const tutoriaId = parseInt(req.params.id, 10);
        
        await db.update(tutoria).set(updatedData).where(eq(tutoria.id, tutoriaId));
        const updatedTutoria = await db.select().from(tutoria).where(eq(tutoria.id, tutoriaId));

        res.status(200).json({
            message: "Tutoría actualizada exitosamente.",
            tutoria: updatedTutoria[0]
        });
    } catch (error) {
        // Manejo de errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error updating tutoria:", error);
        res.status(500).json({ message: "Error updating tutoria." });
    }
});

export { router as tutoriaRouter };