import express, { Request, Response } from "express";
import { eq, desc } from 'drizzle-orm'; 
import { db } from "../db/connection";
import { tutor } from "../db/Entities";
import { TutorDTO } from "../Dtos"; 
import * as z from "zod";

const router = express.Router();

// Ruta GET para obtener todos los tutores
router.get("/", async (req: Request, res: Response) => {
  try {
    const tutors = await db.select().from(tutor);
    res.json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    res.status(500).json({ message: "Error fetching tutors." });
  }
});

// Ruta POST para agregar un nuevo tutor
router.post("/", async (req: Request, res: any) => {
  try {
    // Validar y parsear los datos del cuerpo de la solicitud
    const newTutor = TutorDTO.parse(req.body);
    await db.insert(tutor).values(newTutor);

    const insertedTutor = await db.select().from(tutor).orderBy(desc(tutor.id)).limit(1);

    res.status(201).json({
      message: "Tutor agregado exitosamente.",
      tutor: insertedTutor[0] 
    });
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error inserting tutor:", error);
    res.status(500).json({ message: "Error inserting tutor." });
  }
});

// Ruta PATCH para actualizar un tutor existente
router.patch("/:id", async (req: Request, res: any) => {
  try {
    // Validar y parsear los datos del cuerpo de la solicitud
    const updatedData = TutorDTO.partial().parse(req.body);

    const tutorId = parseInt(req.params.id, 10);

    await db.update(tutor).set(updatedData).where(eq(tutor.id, tutorId));

    const updatedTutor = await db.select().from(tutor).where(eq(tutor.id, tutorId));

    res.status(200).json({
      message: "Tutor actualizado exitosamente.",
      tutor: updatedTutor[0]
    });
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error("Error updating tutor:", error);
    res.status(500).json({ message: "Error updating tutor." });
  }
});

export { router as tutorRouter };
