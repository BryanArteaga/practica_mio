import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const tutor = pgTable('Tutor', {
    id: serial('id').primaryKey(),
    name: text('name'),
    identificacion: integer('identificacion').notNull().unique(),
    experticia:  text('experticia')
});

export const tutorado = pgTable('Tutorado', {
    id: serial('id').primaryKey(),
    name: text('name'),
    identificacion: integer('identificacion').notNull().unique()
});

export const tutoria = pgTable('Tutoria', {
    id: serial('id').primaryKey(),
    asignatura: text('asignatura'),
    numero_horas: integer('numero_horas'),
    fecha:  timestamp('fecha'),
    hora: text('hora'),
    tutorId: integer('tutorId').notNull().references(() => tutor.id, { onDelete: 'cascade' }), 
    tutoradoId: integer('tutoradoId').notNull().references(() => tutorado.id, { onDelete: 'cascade' }),
});

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