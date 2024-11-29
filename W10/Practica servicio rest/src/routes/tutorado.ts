import express, { Request, Response } from "express";
import { eq, desc } from 'drizzle-orm';
import { db } from "../db/connection";
import { tutorado } from "../db/Entities";
import { TutoradoDTO } from "../Dtos";
import * as z from "zod";

const router = express.Router();

// Ruta GET para obtener todos los tutorados
router.get("/", async (req: Request, res: Response) => {
    try {
        const tutorados = await db.select().from(tutorado);
        res.json(tutorados);
    } catch (error) {
        console.error("Error fetching tutorados:", error);
        res.status(500).json({ message: "Error fetching tutorados." });
    }
});

// Ruta POST para agregar un nuevo tutorado
router.post("/", async (req: Request, res: any) => {
    try {
        // Validar y parsear los datos del cuerpo de la solicitud
        const newTutorado = TutoradoDTO.parse(req.body);
        
        await db.insert(tutorado).values(newTutorado);
        const insertedTutorado = await db.select().from(tutorado).orderBy(desc(tutorado.id)).limit(1);

        res.status(201).json({
            message: "Tutorado agregado exitosamente.",
            tutorado: insertedTutorado[0]
        });
    } catch (error) {
        // Manejo de errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error inserting tutorado:", error);
        res.status(500).json({ message: "Error inserting tutorado." });
    }
});

// Ruta PATCH para actualizar un tutorado existente
router.patch("/:id", async (req: Request, res: any) => {
    try {
        // Validar y parsear los datos del cuerpo de la solicitud
        const updatedData = TutoradoDTO.partial().parse(req.body);
        
        const tutoradoId = parseInt(req.params.id, 10);
        
        await db.update(tutorado).set(updatedData).where(eq(tutorado.id, tutoradoId));
        const updatedTutorado = await db.select().from(tutorado).where(eq(tutorado.id, tutoradoId));

        res.status(200).json({
            message: "Tutorado actualizado exitosamente.",
            tutorado: updatedTutorado[0]
        });
    } catch (error) {
        // Manejo de errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error updating tutorado:", error);
        res.status(500).json({ message: "Error updating tutorado." });
    }
});

export { router as tutoradoRouter };