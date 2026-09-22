const express = require('express');
const {
  getHealthStatus,
  getDatabaseHealthStatus,
} = require('../controllers/health.controller');

const router = express.Router();

router.get('/', getHealthStatus);
router.get('/db', getDatabaseHealthStatus);

module.exports = router;
