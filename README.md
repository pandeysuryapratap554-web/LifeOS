# LifeOS

LifeOS is a personal productivity platform in progress. It will eventually help each user manage tasks, habits, goals, expenses, and productivity insights. This first phase establishes a clean Node.js, Express, PostgreSQL, and vanilla JavaScript foundation.

## Tech stack

- Frontend: HTML, CSS, and vanilla JavaScript
- Backend: Node.js and Express
- Database: PostgreSQL via the `pg` package

## Project structure

```text
LifeOs/
├── backend/
│   ├── config/db.js              # PostgreSQL setup and connection check
│   ├── controllers/health.controller.js
│   ├── middleware/error.middleware.js
│   ├── routes/health.routes.js
│   ├── app.js                    # Express configuration
│   └── server.js                 # Application entry point
├── frontend/
│   ├── css/style.css
│   ├── js/app.js
│   └── index.html
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Install dependencies

From the project root, run:

```bash
npm install
```

## Configure environment variables

1. Copy `.env.example` and rename the copy to `.env`.
2. Update `DATABASE_URL` with the connection string for your local PostgreSQL database.
3. Keep `.env` private. It is ignored by Git.

Example local database URL:

```text
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/lifeos
```

## Run the application

Start the server:

```bash
npm start
```

For development with automatic restarts after changes:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. Express serves the files in `frontend/`, so the frontend and API share one local address.

## Test the health endpoint

With the server running, visit [http://localhost:3000/api/health](http://localhost:3000/api/health), or run:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "LifeOS API is running"
}
```

## Database connection check

`backend/config/db.js` exports `checkDatabaseConnection()`. Later API features can import and call it to verify PostgreSQL before performing database work. Phase 1 does not create tables or run this check automatically, so the health endpoint remains useful even while PostgreSQL is being installed or configured.
