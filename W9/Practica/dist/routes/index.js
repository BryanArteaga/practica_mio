"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsuario = exports.routertutoria = exports.routertutorado = exports.routertutor = void 0;
var tutor_1 = require("./tutor");
Object.defineProperty(exports, "routertutor", { enumerable: true, get: function () { return __importDefault(tutor_1).default; } });
var tutorado_1 = require("./tutorado");
Object.defineProperty(exports, "routertutorado", { enumerable: true, get: function () { return __importDefault(tutorado_1).default; } });
var tutoria_1 = require("./tutoria");
Object.defineProperty(exports, "routertutoria", { enumerable: true, get: function () { return __importDefault(tutoria_1).default; } });
var usuario_1 = require("./usuario");
Object.defineProperty(exports, "routerUsuario", { enumerable: true, get: function () { return __importDefault(usuario_1).default; } });
