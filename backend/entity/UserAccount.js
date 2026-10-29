// ENTITY: holds user account data and talks to the database.
const { hashPassword, verifyPassword } = require('../utils/password');

class UserAccount {
  constructor(db) {
    this.db = db;
  }

  createUserAccount({ username, password, email, profileId }) {
    const result = this.db
      .prepare(
        'INSERT INTO user_account (username, password_hash, email, profile_id) VALUES (?, ?, ?, ?)'
      )
      .run(username, hashPassword(password), email ?? null, profileId);
    return Number(result.lastInsertRowid);
  }

  findByUsername(username) {
    return this.db
      .prepare(
        `SELECT a.*, p.name AS profile_name
           FROM user_account a JOIN user_profile p ON p.id = a.profile_id
          WHERE a.username = ?`
      )
      .get(username);
  }

  findById(userId) {
    const row = this.db
      .prepare(
        `SELECT a.id, a.username, a.email, a.is_active, p.name AS profile
           FROM user_account a JOIN user_profile p ON p.id = a.profile_id
          WHERE a.id = ?`
      )
      .get(userId);
    return row ?? null;
  }

  /**
   * Returns the logged-in account (without password) or null.
   */
  login(username, password) {
    const row = this.findByUsername(username);
    if (!row || !row.is_active) return null;
    if (!verifyPassword(password, row.password_hash)) return null;
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      profile: row.profile_name,
    };
  }

  /** #12 Logout: remember when the user last logged out. */
  recordLogout(userId) {
    const result = this.db
      .prepare("UPDATE user_account SET last_logout_at = datetime('now') WHERE id = ?")
      .run(userId);
    return result.changes === 1;
  }
}

module.exports = UserAccount;
