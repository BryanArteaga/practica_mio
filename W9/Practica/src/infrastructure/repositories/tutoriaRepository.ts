
import { dbMySQL } from "../../data/db";
import { tutoria } from "../../data/shemaMysql";
import { eq, sql } from "drizzle-orm";
import { TutoriaDTO } from "../../domain/dtos/tutoriaDto";

export class TutoriaRepository {
    static findAll() {
        throw new Error('Method not implemented.');
    }
    static createTutoria(data: TutoriaDTO) {
        throw new Error('Method not implemented.');
    }

    async findAll() {
        return dbMySQL.select().from(tutoria);
    }

    async findById(id: number) {
        return dbMySQL.select().from(tutoria).where(eq(tutoria.id, id));
    }

    async createTutoria(data: any) {
        await dbMySQL.insert(tutoria).values(data);

        const [lastInsert] = await dbMySQL.select({ id: tutoria.id })
            .from(tutoria)
            .orderBy(sql`${tutoria.id} DESC`)
            .limit(1);

        return lastInsert.id; 
    }

    async updateTutoria(id: number, data: any) {
        await dbMySQL.update(tutoria).set(data).where(eq(tutoria.id, id));
        return this.findById(id); 
    }

    async deleteTutoria(id: number) {
        return dbMySQL.delete(tutoria).where(eq(tutoria.id, id));
    }
}
