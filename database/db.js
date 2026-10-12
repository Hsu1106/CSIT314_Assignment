// Opens the SQLite database and makes sure all tables exist.
// Uses Node's built-in SQLite (node:sqlite) - no native install needed.
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_DB_FILE = path.join(__dirname, 'app.db');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

/**
 * @param {string} file  path to the .db file, or ':memory:' for tests
 */
function createDatabase(file = DEFAULT_DB_FILE) {
  const db = new DatabaseSync(file);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec(fs.readFileSync(SCHEMA_FILE, 'utf8'));
  return db;
}

module.exports = { createDatabase };
