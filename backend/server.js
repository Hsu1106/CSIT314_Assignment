const { createDatabase } = require('../database/db');
const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;
const db = createDatabase();
const app = createApp(db);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
