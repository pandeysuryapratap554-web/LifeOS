const { checkDatabaseConnection } = require('../config/db');

function getHealthStatus(request, response) {
  response.status(200).json({
    success: true,
    message: 'LifeOS API is running',
  });
}

async function getDatabaseHealthStatus(request, response) {
  try {
    await checkDatabaseConnection();

    response.status(200).json({
      success: true,
      message: 'Database connected successfully',
    });
  } catch (error) {
    response.status(503).json({
      success: false,
      message: 'Database connection is unavailable.',
    });
  }
}

module.exports = {
  getHealthStatus,
  getDatabaseHealthStatus,
};
