"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutoriasRelations = exports.tutoradosRelations = exports.tutorsRelations = exports.tutoria = exports.tutorado = exports.tutor = exports.usuario = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.usuario = (0, pg_core_1.pgTable)("Usuario", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    nombre: (0, pg_core_1.varchar)("nombre", { length: 100 }).notNull(),
    clave: (0, pg_core_1.varchar)("clave", { length: 255 }).notNull(),
    estado: (0, pg_core_1.varchar)("estado", { length: 10 }).notNull()
});
exports.tutor = (0, pg_core_1.pgTable)('Tutor', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name'),
    identificacion: (0, pg_core_1.integer)('identificacion').notNull().unique(),
    experticia: (0, pg_core_1.text)('experticia')
});
exports.tutorado = (0, pg_core_1.pgTable)('Tutorado', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name'),
    identificacion: (0, pg_core_1.integer)('identificacion').notNull().unique()
});
exports.tutoria = (0, pg_core_1.pgTable)('Tutoria', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    asignatura: (0, pg_core_1.text)('asignatura'),
    numero_horas: (0, pg_core_1.integer)('numero_horas'),
    fecha: (0, pg_core_1.timestamp)('fecha'),
    hora: (0, pg_core_1.text)('hora'),
    tutorId: (0, pg_core_1.integer)('tutorId').notNull().references(() => exports.tutor.id, { onDelete: 'cascade' }),
    tutoradoId: (0, pg_core_1.integer)('tutoradoId').notNull().references(() => exports.tutorado.id, { onDelete: 'cascade' }),
});
exports.tutorsRelations = (0, drizzle_orm_1.relations)(exports.tutor, ({ many }) => ({
    tutorias: many(exports.tutoria),
}));
exports.tutoradosRelations = (0, drizzle_orm_1.relations)(exports.tutorado, ({ many }) => ({
    tutoria: many(exports.tutoria),
}));
exports.tutoriasRelations = (0, drizzle_orm_1.relations)(exports.tutoria, ({ one }) => ({
    tutor: one(exports.tutor, { fields: [exports.tutoria.tutorId], references: [exports.tutor.id] }),
    tutorado: one(exports.tutorado, { fields: [exports.tutoria.tutoradoId], references: [exports.tutorado.id] }),
}));
