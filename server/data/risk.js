const riskTrend = [
  { date: "2026-02-08", risk_score: 35 },
  { date: "2026-02-09", risk_score: 38 },
  { date: "2026-02-10", risk_score: 33 },
  { date: "2026-02-11", risk_score: 40 },
  { date: "2026-02-12", risk_score: 42 },
  { date: "2026-02-13", risk_score: 37 },
  { date: "2026-02-14", risk_score: 44 },
  { date: "2026-02-15", risk_score: 41 },
  { date: "2026-02-16", risk_score: 46 },
  { date: "2026-02-17", risk_score: 43 },
  { date: "2026-02-18", risk_score: 48 },
  { date: "2026-02-19", risk_score: 45 },
  { date: "2026-02-20", risk_score: 50 },
  { date: "2026-02-21", risk_score: 47 },
  { date: "2026-02-22", risk_score: 52 },
  { date: "2026-02-23", risk_score: 55 },
  { date: "2026-02-24", risk_score: 49 },
  { date: "2026-02-25", risk_score: 53 },
  { date: "2026-02-26", risk_score: 56 },
  { date: "2026-02-27", risk_score: 51 },
  { date: "2026-02-28", risk_score: 58 },
  { date: "2026-03-01", risk_score: 54 },
  { date: "2026-03-02", risk_score: 60 },
  { date: "2026-03-03", risk_score: 57 },
  { date: "2026-03-04", risk_score: 62 },
  { date: "2026-03-05", risk_score: 59 },
  { date: "2026-03-06", risk_score: 65 },
  { date: "2026-03-07", risk_score: 61 },
  { date: "2026-03-08", risk_score: 63 },
  { date: "2026-03-09", risk_score: 58 }
];

const riskCategories = [
  { category: "Fraud", count: 45, percentage: 30 },
  { category: "Chargeback", count: 30, percentage: 20 },
  { category: "Identity Theft", count: 22, percentage: 15 },
  { category: "Account Takeover", count: 18, percentage: 12 },
  { category: "Money Laundering", count: 15, percentage: 10 },
  { category: "Other", count: 20, percentage: 13 }
];

module.exports = { riskTrend, riskCategories };
