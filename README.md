# LifeOS

LifeOS is a personal productivity platform in progress. It will eventually help each user manage tasks, habits, goals, expenses, and productivity insights. Its foundation uses Node.js, Express, MySQL, and vanilla JavaScript.

## Tech stack

- Frontend: HTML, CSS, and vanilla JavaScript
- Backend: Node.js and Express
- Database: MySQL via the `mysql2` package

## Project structure

```text
LifeOs/
├── backend/
│   ├── config/db.js              # MySQL setup and connection check
│   ├── controllers/health.controller.js
│   ├── database/schema.sql        # Users table schema
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

## Set up MySQL

Make sure the `mysql` command is available in Command Prompt, then create the LifeOS database:

```cmd
mysql -u root -p -e "CREATE DATABASE lifeos;"
```

MySQL will prompt for the password of the selected database user. The password is not included in this command or stored in this repository.

Create the Phase 2A tables by running the schema file from the project root:

```cmd
mysql -u root -p lifeos < backend\database\schema.sql
```

You can safely run the schema command again later. `CREATE TABLE IF NOT EXISTS` avoids an error when the `users` table already exists.

## Configure environment variables

1. Copy `.env.example` and rename the copy to `.env`.
2. Update the MySQL variables with your local database values.
3. Keep `.env` private. It is ignored by Git.

Example local MySQL configuration:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=lifeos
```

For a standard local installation, `DB_HOST` is usually `localhost`, `DB_PORT` is usually `3306`, and `DB_NAME` is `lifeos`. Do not commit your real `.env` file.

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

## Health checks

The existing API health endpoint confirms that Express is running:

```bash
curl http://localhost:3000/api/health
```

The database health endpoint confirms that LifeOS can connect to MySQL:

```bash
curl http://localhost:3000/api/health/db
```

When MySQL and the database environment variables are configured correctly, it returns:

```json
{
  "success": true,
  "message": "Database connected successfully"
}
```

If the connection is unavailable, it returns HTTP `503` with a safe message. Database connection details are never sent to the browser.

## Database connection and users schema

`backend/config/db.js` reads the MySQL environment variables and creates a connection pool only when it is first needed. Its `checkDatabaseConnection()` function runs `SELECT 1`, a lightweight query that verifies MySQL is reachable. `GET /api/health/db` calls this function without exposing connection errors to the client.

`backend/database/schema.sql` creates the `users` table. Each user has an automatically generated ID, a required name, a unique required email, a required password hash (never a plain-text password), and timestamps recording when the row was created and last updated. Registration and login are intentionally not included yet.
