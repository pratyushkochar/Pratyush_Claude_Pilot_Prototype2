const express = require('express');
const router = express.Router();
const payments = require('../data/payments');
const { riskTrend } = require('../data/risk');
const alerts = require('../data/alerts');

router.get('/', (req, res) => {
  const totalPayments = payments.length;
  const totalVolume = payments.reduce((sum, p) => sum + p.amount, 0);
  const completedCount = payments.filter(p => p.status === 'completed').length;
  const successRate = Math.round((completedCount / totalPayments) * 100 * 10) / 10;
  const latestRiskScore = riskTrend[riskTrend.length - 1].risk_score;
  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const flaggedTransactions = payments.filter(p => p.status === 'flagged').length;

  res.json({
    totalPayments,
    totalVolume,
    successRate,
    averageRiskScore: latestRiskScore,
    activeAlerts,
    flaggedTransactions
  });
});

module.exports = router;
