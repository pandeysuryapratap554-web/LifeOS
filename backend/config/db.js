const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL;

const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false }
          : false,
    })
  : null;

async function checkDatabaseConnection() {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured.');
  }

  await pool.query('SELECT 1');
  return true;
}

module.exports = {
  pool,
  checkDatabaseConnection,
};
