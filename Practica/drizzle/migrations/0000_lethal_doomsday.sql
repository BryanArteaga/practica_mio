CREATE TABLE IF NOT EXISTS "Tutor" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"identificacion" integer NOT NULL,
	"experticia" text,
	CONSTRAINT "Tutor_identificacion_unique" UNIQUE("identificacion")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tutorado" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"identificacion" integer NOT NULL,
	CONSTRAINT "Tutorado_identificacion_unique" UNIQUE("identificacion")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tutoria" (
	"id" serial PRIMARY KEY NOT NULL,
	"asignatura" text,
	"numero_horas" integer,
	"fecha" timestamp,
	"hora" text,
	"tutorId" integer NOT NULL,
	"tutoradoId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tutoria" ADD CONSTRAINT "Tutoria_tutorId_Tutor_id_fk" FOREIGN KEY ("tutorId") REFERENCES "public"."Tutor"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tutoria" ADD CONSTRAINT "Tutoria_tutoradoId_Tutorado_id_fk" FOREIGN KEY ("tutoradoId") REFERENCES "public"."Tutorado"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
