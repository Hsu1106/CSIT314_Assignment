// Builds the Express app (separate from server.js so it can be tested).
const express = require('express');
const path = require('node:path');
const authRoutes = require('./routes/authRoutes');

function createApp(db) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'frontend')));

  app.use('/api/auth', authRoutes(db));

  app.get('/', (req, res) => res.redirect('/login.html'));
  return app;
}

module.exports = { createApp };
