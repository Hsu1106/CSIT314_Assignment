# CSIT314_Assignment

Online platform matching renovation customers to interior designers.
Design follows the **Boundary-Control-Entity (B-C-E)** framework.

## Tech stack
- Node.js (>= 22.13) + Express
- SQLite (Node built-in `node:sqlite`)
- Tests: Node built-in test runner (`node --test`)
- CI: GitHub Actions (`.github/workflows/ci.yml`)

## Folder structure
```
backend/
  entity/       ENTITY classes  (data + database access)
  controller/   CONTROL classes (application logic, one per user story)
  routes/       HTTP endpoints that connect boundary -> controller
  utils/
  app.js, server.js
frontend/
  js/boundary/  BOUNDARY classes (UI pages)
  *.html, css/
database/       schema.sql, db.js, seed.js
tests/          unit tests (*.test.js)
docs/           reports, weekly summaries, diagrams
```

## Getting started
```
npm install
npm run seed      # creates default account admin / admin123
npm start         # http://localhost:3000
npm test
```

## Sync with GitHub
Double-click `sync.bat` (pull -> run tests -> commit -> push).
