function getHealthStatus(request, response) {
  response.status(200).json({
    success: true,
    message: 'LifeOS API is running',
  });
}

module.exports = {
  getHealthStatus,
};
