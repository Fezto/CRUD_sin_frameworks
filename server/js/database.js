import { Kysely, SqliteDialect } from "kysely";
import SQLite from "better-sqlite3";

const dialect = new SqliteDialect({
  database: new SQLite("server/database/pokemon.db"),
});

//* Para consultas que podamos armar con el query builder de Kysely

const db_kys = new Kysely({
  dialect,
});

//* Para consultas que no se puedan armar con el query builder de Kysely
//* y que no utilicen un lenguaje SQL estándar

const db_sql = new SQLite("server/database/pokemon.db");

//* Funciones

export async function get({ table }) {
  const data = await db_kys.selectFrom(table).selectAll().execute();
  return data;
}

export async function post({ table, data }) {
  await db_kys.insertInto(table).values(data).executeTakeFirst();
}

export async function remove({ table, id }) {
  await db_kys.deleteFrom(table).where("id", "=", id).executeTakeFirst();
}

export async function put({ table, id, data }) {
  await db_kys.updateTable(table).set(data).where("id", "=", id).executeTakeFirst();
}

export async function getTables() {
  const data = await db_kys.selectFrom("sqlite_master").select("name").where("type", "=", "table").execute();
  return data.map((table) => table["name"]);
}

export async function getColumns({ table, property = "name" }) {
  const data = db_sql.prepare(`PRAGMA table_info(${table})`).all();
  return data.map((column) => column[property]);
}
