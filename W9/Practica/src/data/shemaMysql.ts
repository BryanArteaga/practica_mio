import { mysqlTable, serial, varchar, int, text, datetime } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const usuario = mysqlTable("Usuario", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  clave: varchar("clave", { length: 255 }).notNull(),
  estado: varchar("estado", { length: 10 }).notNull()
});

export const tutor = mysqlTable('Tutor', {
  id: serial('id').primaryKey(),
  name: text('name'),
  identificacion: int('identificacion').notNull().unique(),
  experticia: text('experticia')
});

export const tutorado = mysqlTable('Tutorado', {
  id: serial('id').primaryKey(),
  name: text('name'),
  identificacion: int('identificacion').notNull().unique()
});

export const tutoria = mysqlTable('Tutoria', {
  id: serial('id').primaryKey(),
  asignatura: text('asignatura'),
  numero_horas: int('numero_horas'),
  fecha: datetime('fecha'),
  hora: text('hora'),
  tutorId: int('tutorId').notNull().references(() => tutor.id, { onDelete: 'cascade' }), 
  tutoradoId: int('tutoradoId').notNull().references(() => tutorado.id, { onDelete: 'cascade' })
});

// Relaciones
export const tutorsRelations = relations(tutor, ({ many }) => ({
  tutorias: many(tutoria),
}));

export const tutoradosRelations = relations(tutorado, ({ many }) => ({
  tutoria: many(tutoria),
}));

export const tutoriasRelations = relations(tutoria, ({ one }) => ({
    tutor: one(tutor, { fields: [tutoria.tutorId], references: [tutor.id] }),
    tutorado: one(tutorado, { fields: [tutoria.tutoradoId], references: [tutorado.id] }),
  }));