const express = require('express');
const router = express.Router();
const alerts = require('../data/alerts');

router.get('/', (req, res) => {
  let result = alerts;

  if (req.query.severity) {
    result = result.filter(a => a.severity === req.query.severity);
  }
  if (req.query.status) {
    result = result.filter(a => a.status === req.query.status);
  }

  res.json(result);
});

module.exports = router;
