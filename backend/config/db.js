const mysql = require('mysql2/promise');

let pool;

function getDatabaseConfig() {
  const requiredVariables = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
  ];
  const missingVariable = requiredVariables.find(
    (variableName) => !process.env[variableName]
  );

  if (missingVariable) {
    throw new Error('Database environment variables are not configured.');
  }

  const port = Number(process.env.DB_PORT);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT must be a valid port number.');
  }

  return {
    host: process.env.DB_HOST,
    port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
}

function getDatabasePool() {
  if (!pool) {
    pool = mysql.createPool(getDatabaseConfig());
  }

  return pool;
}

async function checkDatabaseConnection() {
  const databasePool = getDatabasePool();

  await databasePool.query('SELECT 1');
  return true;
}

module.exports = {
  getDatabasePool,
  checkDatabaseConnection,
};
