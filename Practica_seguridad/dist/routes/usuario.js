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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const routerUsuario = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta1';
// Registrar un nuevo usuario
routerUsuario.post('/registrar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, clave } = req.body;
    const hash = yield bcrypt_1.default.hash(clave, 10);
    const newUser = yield db_1.db.insert(schema_1.usuario).values({
        nombre,
        clave: hash,
        estado: 'Activo',
    }).returning();
    res.status(201).json({ id: newUser[0].id, nombre: newUser[0].nombre });
}));
// Iniciar sesión
routerUsuario.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, clave } = req.body;
        const user = yield db_1.db.select().from(schema_1.usuario).where((0, drizzle_orm_1.eq)(schema_1.usuario.nombre, nombre)).execute();
        if (!user.length || !(yield bcrypt_1.default.compare(clave, user[0].clave))) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user[0].id, nombre: user[0].nombre, estado: user[0].estado }, JWT_SECRET);
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}));
exports.default = routerUsuario;
