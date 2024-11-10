//import sqlite3 from "sqlite3"; //allows to use SQLite with Node.js
//import { open } from "sqlite";

import sqlite3 from "sqlite3"; // The driver for the database
import { open, Database } from "sqlite"; // Use `Database` type from `sqlite`

const initDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "database.sqlite",
   driver: sqlite3.Database,
 });
 // Create a "budget" table if it doesn't exist
 await db.exec(`
   CREATE TABLE IF NOT EXISTS expenses (
     id TEXT PRIMARY KEY,
     description TEXT NOT NULL,
     cost INTEGER NOT NULL
   );
 `);
 return db;
};

export default initDB;

