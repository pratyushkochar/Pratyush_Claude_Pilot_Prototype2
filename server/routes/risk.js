const express = require('express');
const router = express.Router();
const { riskTrend, riskCategories } = require('../data/risk');

router.get('/trend', (req, res) => {
  res.json(riskTrend);
});

router.get('/categories', (req, res) => {
  res.json(riskCategories);
});

module.exports = router;
