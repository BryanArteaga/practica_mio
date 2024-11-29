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
exports.deleteTutoria = exports.deleteTutorado = exports.deleteTutor = exports.editaTutoria = exports.editaTutorado = exports.editaTutor = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const schema_1 = require("./schema");
const tutor_1 = __importDefault(require("./routes/tutor"));
const tutorado_1 = __importDefault(require("./routes/tutorado"));
const tutoria_1 = __importDefault(require("./routes/tutoria"));
const port = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/tutor', tutor_1.default);
app.use('/tutorado', tutorado_1.default);
app.use('/tutoria', tutoria_1.default);
//funcion para editar tutor
function editaTutor(tutorId, newName, newIdentificacion, newExperticia) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.update(schema_1.tutor).set({
            name: newName,
            identificacion: newIdentificacion,
            experticia: newExperticia
        }).where((0, drizzle_orm_1.eq)(schema_1.tutor.id, tutorId));
        return `Tutor con ID ${tutorId} ha sido actualizado.`;
    });
}
exports.editaTutor = editaTutor;
//funcion para editar tutorado
function editaTutorado(tutoradoId, newName, newIdentificacion) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.update(schema_1.tutorado).set({
            name: newName,
            identificacion: newIdentificacion,
        }).where((0, drizzle_orm_1.eq)(schema_1.tutorado.id, tutoradoId));
        return `Tutorado con ID ${tutoradoId} ha sido actualizado.`;
    });
}
exports.editaTutorado = editaTutorado;
//funcion para editar tutoria
function editaTutoria(tutoriaId, newAsignatura, newNumero_horas, newFecha, newHora) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.update(schema_1.tutoria).set({
            asignatura: newAsignatura,
            numero_horas: newNumero_horas,
            fecha: newFecha,
            hora: newHora,
        }).where((0, drizzle_orm_1.eq)(schema_1.tutoria.id, tutoriaId));
        return `La tutoria ${tutoriaId} ha sido actualizado.`;
    });
}
exports.editaTutoria = editaTutoria;
//funcion para eliminar tutor
function deleteTutor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.delete(schema_1.tutoria).where((0, drizzle_orm_1.eq)(schema_1.tutoria.tutorId, id));
        yield db_1.db.delete(schema_1.tutor).where((0, drizzle_orm_1.eq)(schema_1.tutor.id, id));
        return `Tutor con ID ${id} ha sido eliminado junto con sus tutorías.`;
    });
}
exports.deleteTutor = deleteTutor;
//funcion para eliminar tutorado
function deleteTutorado(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.delete(schema_1.tutoria).where((0, drizzle_orm_1.eq)(schema_1.tutoria.tutoradoId, id));
        yield db_1.db.delete(schema_1.tutorado).where((0, drizzle_orm_1.eq)(schema_1.tutorado.id, id));
        return `Tutorado con ID ${id} ha sido eliminado, junto con sus tutorías.`;
    });
}
exports.deleteTutorado = deleteTutorado;
//funcion para eliminar tutoria
function deleteTutoria(tutoriaId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.delete(schema_1.tutoria).where((0, drizzle_orm_1.eq)(schema_1.tutoria.id, tutoriaId));
        return `Tutoria ${tutoriaId} a sido eliminados.`;
    });
}
exports.deleteTutoria = deleteTutoria;
editaTutor(0, 'prueba edicion', 123123123, 'algebra baldor').then(mensaje => {
    console.log(mensaje);
});
editaTutoria(0, 'matematicas', 10, new Date(2035 - 0o2 - 0o2), '12:00AM').then(mensaje => {
    console.log(mensaje);
});
deleteTutorado(0).then(mensaje => {
    console.log(mensaje);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
