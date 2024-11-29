"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../app");
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
const routertutoria = (0, express_1.Router)();
// Ruta para obtener tutorías
routertutoria.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.select().from(schema_1.tutoria);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las tutorías' });
    }
}));
// Consultar un tutoria por id
routertutoria.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.select().from(schema_1.tutoria).where((0, drizzle_orm_1.eq)(schema_1.tutoria.id, Number(req.params.id)));
    res.json(result);
}));
// Ruta para crear una nueva tutoría
routertutoria.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { asignatura, numero_horas, fecha, hora, tutorId, tutoradoId } = req.body;
    try {
        const nuevaTutoria = yield db_1.db
            .insert(schema_1.tutoria)
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la tutoría', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Error desconocido al crear la tutoría' });
        }
    }
}));
// Ruta para modificar una tutoría existente
routertutoria.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { asignatura, numero_horas, fecha, hora } = req.body;
    try {
        const mensaje = yield (0, app_1.editaTutoria)(Number(id), asignatura, numero_horas, new Date(fecha), hora);
        res.json({ message: mensaje });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: 'Error al editar la tutoría', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Error desconocido al editar la tutoría' });
        }
    }
}));
// Ruta para eliminar una tutoría existente
routertutoria.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensaje = yield (0, app_1.deleteTutoria)(Number(id));
        res.json({ message: mensaje });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tutoría' });
    }
}));
exports.default = routertutoria;
