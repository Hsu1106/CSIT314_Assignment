// HTTP layer: receives requests from the boundary (web page) and forwards to controllers.
const express = require('express');
const UserAccount = require('../entity/UserAccount');
const LoginController = require('../controller/LoginController');
const LogoutController = require('../controller/LogoutController');
const { setSessionCookie, clearSessionCookie } = require('../utils/session');
const { requireLogin } = require('../middleware/auth');

function authRoutes(db, sessions) {
  const router = express.Router();
  const userAccount = new UserAccount(db);
  const loginController = new LoginController(userAccount);
  const logoutController = new LogoutController(userAccount);

  // #11 Login
  router.post('/login', (req, res) => {
    const { username, password } = req.body ?? {};
    const result = loginController.login(username, password);
    if (result.success) setSessionCookie(res, sessions.create(result.account));
    res.status(result.success ? 200 : 401).json(result);
  });

  // #12 Logout
  router.post('/logout', requireLogin, (req, res) => {
    const result = logoutController.logout(req.account.id);
    sessions.destroy(req.sessionToken);
    clearSessionCookie(res);
    res.json(result);
  });

  // Who am I? (used by every page to decide what to show)
  router.get('/me', (req, res) => {
    res.json({ loggedIn: Boolean(req.account), account: req.account ?? null });
  });

  return router;
}

module.exports = authRoutes;
