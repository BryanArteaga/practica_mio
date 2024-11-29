import { Router, Request, Response } from "express";
import { crearTransaccion, obtenerTransacciones, obtenerTransaccionPorId, actualizarTransaccion, eliminarTransaccion } from "../repositories/TransaccionRepository";

const routerTransaccion = Router();

// Obtener todas las transacciones
routerTransaccion.get("/", async (req: Request, res: Response) => {
  const transacciones = await obtenerTransacciones();
  res.json(transacciones);
});

// Obtener una transacción por ID
routerTransaccion.get("/:id", async (req: Request, res: Response) => {
  const transaccion = await obtenerTransaccionPorId(Number(req.params.id));
  res.json(transaccion);
});

// Crear una nueva transacción
routerTransaccion.post("/", async (req: Request, res: Response) => {
  const transaccion = await crearTransaccion(req.body);
  res.status(201).json(transaccion);
});

// Actualizar una transacción
routerTransaccion.put("/:id", async (req: Request, res: Response) => {
  const transaccion = await actualizarTransaccion(Number(req.params.id), req.body);
  res.json(transaccion);
});

// Eliminar una transacción
routerTransaccion.delete("/:id", async (req: Request, res: Response) => {
  const result = await eliminarTransaccion(Number(req.params.id));
  res.json(result);
});

export default routerTransaccion;
