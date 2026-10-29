// Simple in-memory login sessions (a random token in an httpOnly cookie).
// Restarting the server logs everyone out - fine for this project.
const crypto = require('node:crypto');

const COOKIE_NAME = 'sid';
const MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  create(account) {
    const token = crypto.randomBytes(32).toString('hex');
    this.sessions.set(token, { account, expiresAt: Date.now() + MAX_AGE_MS });
    return token;
  }

  get(token) {
    const s = token && this.sessions.get(token);
    if (!s) return null;
    if (s.expiresAt < Date.now()) {
      this.sessions.delete(token);
      return null;
    }
    return s.account;
  }

  destroy(token) {
    this.sessions.delete(token);
  }
}

function readCookie(req, name = COOKIE_NAME) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, { httpOnly: true, sameSite: 'strict', maxAge: MAX_AGE_MS, path: '/' });
}

function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' });
}

module.exports = { SessionManager, readCookie, setSessionCookie, clearSessionCookie };
