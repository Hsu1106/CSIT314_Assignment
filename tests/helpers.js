// Shared test helpers: fresh in-memory database for every test.
const { createDatabase } = require('../database/db');

function createTestDatabase() {
  return createDatabase(':memory:');
}

function profileId(db, name) {
  return db.prepare('SELECT id FROM user_profile WHERE name = ?').get(name).id;
}

module.exports = { createTestDatabase, profileId };
