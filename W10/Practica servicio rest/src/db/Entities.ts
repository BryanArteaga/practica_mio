import { mysqlTable, serial, varchar, int, datetime } from "drizzle-orm/mysql-core";

export const tutor = mysqlTable("tutor", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  identificacion: varchar("identificacion", { length: 50 }),
  experticia: varchar("experticia", { length: 255 }),
});

export const tutorado = mysqlTable("tutorado", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  identificacion: varchar("identificacion", { length: 50 }),
});

export const tutoria = mysqlTable("tutoria", {
  id: serial("id").primaryKey(),
  tutorId: int("tutorid"),
  tutoradoId: int("tutoradoid"),
  asignatura: varchar("asignatura", { length: 255 }),
  numero_horas: int("numero_horas"),
  fecha: datetime("fecha"),
  hora: varchar("hora", { length: 50 }),
});
