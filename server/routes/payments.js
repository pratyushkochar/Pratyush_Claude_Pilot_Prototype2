const express = require('express');
const router = express.Router();
const payments = require('../data/payments');

router.get('/', (req, res) => {
  let result = payments;

  if (req.query.status) {
    result = result.filter(p => p.status === req.query.status);
  }
  if (req.query.risk_level) {
    result = result.filter(p => p.risk_level === req.query.risk_level);
  }

  res.json(result);
});

module.exports = router;
