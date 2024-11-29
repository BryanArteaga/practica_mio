import { drizzle as drizzlePostgres } from "drizzle-orm/neon-http";  
import { drizzle as drizzleMySQL } from "drizzle-orm/mysql2";       
import mysql from "mysql2/promise";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); 

// Configuración de conexión para PostgreSQL (Neon)
const sql = neon(process.env.DATABASE_URL!);
export const dbPostgres = drizzlePostgres(sql);

// Configuración de conexión para MySQL
export let dbMySQL: ReturnType<typeof drizzleMySQL>;

export async function initializeMySQL() {
    const mysqlConnection = await mysql.createConnection(process.env.MYSQL_DATABASE_URL!);
    dbMySQL = drizzleMySQL(mysqlConnection);
}