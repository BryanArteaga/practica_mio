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
const routertutorado = (0, express_1.Router)();
// Consultar todos los tutorados
routertutorado.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorados = yield db_1.db.select().from(schema_1.tutorado);
        res.json(tutorados);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los tutorados' });
    }
}));
// Consultar un tutoradp por id
routertutorado.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.db.select().from(schema_1.tutorado).where((0, drizzle_orm_1.eq)(schema_1.tutorado.id, Number(req.params.id)));
    res.json(result);
}));
// Crear un nuevo tutorado
routertutorado.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, identificacion } = req.body;
    try {
        const nuevoTutorado = yield db_1.db.insert(schema_1.tutorado).values({
            name: name,
            identificacion: identificacion,
        });
        res.status(201).json({ message: 'Tutorado creado exitosamente',
            tutorado: {
                name,
                identificacion
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el tutorado' });
    }
}));
// Modificar un tutorado existente
routertutorado.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, identificacion } = req.body;
    try {
        const mensaje = yield (0, app_1.editaTutorado)(Number(id), name, identificacion);
        res.json({ message: mensaje });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al editar el tutorado' });
    }
}));
// Eliminar un tutor existente
routertutorado.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const mensaje = yield (0, app_1.deleteTutorado)(Number(id));
        res.json({ message: mensaje });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tutorado' });
    }
}));
exports.default = routertutorado;
