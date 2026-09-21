function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    message: 'Route not found',
  });
}

function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  response.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'An unexpected error occurred.'
        : error.message || 'Request could not be completed.',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
