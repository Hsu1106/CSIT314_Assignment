// Puts the logged-in account on req.account and protects routes by profile.
const { readCookie } = require('../utils/session');

function attachAccount(sessions) {
  return (req, res, next) => {
    req.sessionToken = readCookie(req);
    req.account = sessions.get(req.sessionToken);
    next();
  };
}

function requireLogin(req, res, next) {
  if (!req.account) return res.status(401).json({ success: false, message: 'Please log in first' });
  next();
}

function requireProfile(...profiles) {
  return (req, res, next) => {
    if (!req.account) return res.status(401).json({ success: false, message: 'Please log in first' });
    if (!profiles.includes(req.account.profile)) {
      return res.status(403).json({ success: false, message: 'You do not have access to this page' });
    }
    next();
  };
}

module.exports = { attachAccount, requireLogin, requireProfile };
