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
const routertutor = (0, express_1.Router)();
// Consultar todos los tutores
routertutor.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutores = yield db_1.db.select().from(schema_1.tutor);
        res.json(tutores);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los tutores' });
    }
}));
// Consultar un tutor por id
routertutor.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.select().from(schema_1.tutor).where((0, drizzle_orm_1.eq)(schema_1.tutor.id, Number(req.params.id)));
    res.json(result);
}));
// Crear un nuevo tutor
routertutor.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, identificacion, experticia } = req.body;
    try {
        const nuevoTutor = yield db_1.db.insert(schema_1.tutor).values({
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
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el tutor' });
    }
}));
// Modificar un tutor existente
routertutor.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, identificacion, experticia } = req.body;
    try {
        const mensaje = yield (0, app_1.editaTutor)(Number(id), name, identificacion, experticia);
        res.json({ message: mensaje });
    }
    catch (error) {
        console.error('Error al actualizar tutor:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el tutor' });
    }
}));
// Eliminar un tutor existente
routertutor.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensaje = yield (0, app_1.deleteTutor)(Number(id));
        res.json({ message: mensaje });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tutor' });
    }
}));
exports.default = routertutor;
