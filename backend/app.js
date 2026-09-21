const path = require('path');
const cors = require('cors');
const express = require('express');
const healthRoutes = require('./routes/health.routes');
const {
  notFoundHandler,
  errorHandler,
} = require('./middleware/error.middleware');

const app = express();
const frontendDirectory = path.join(__dirname, '..', 'frontend');

app.use(cors());
app.use(express.json());

app.get('/', (request, response, next) => {
  response.sendFile(path.join(frontendDirectory, 'index.html'), (error) => {
    if (error) {
      next(error);
    }
  });
});

app.use(express.static(frontendDirectory));

app.use('/api/health', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
