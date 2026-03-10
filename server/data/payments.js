const payments = [
  { id: "TXN-001", amount: 48500.00, merchant: "Amazon Web Services", status: "completed", date: "2026-03-09T08:15:00Z", risk_level: "low", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-002", amount: 12750.00, merchant: "Stripe", status: "completed", date: "2026-03-08T14:30:00Z", risk_level: "low", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-003", amount: 3200.00, merchant: "Shopify", status: "flagged", date: "2026-03-08T09:45:00Z", risk_level: "high", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-004", amount: 890.50, merchant: "DigitalOcean", status: "completed", date: "2026-03-07T16:20:00Z", risk_level: "low", payment_method: "debit_card", currency: "USD" },
  { id: "TXN-005", amount: 27300.00, merchant: "Google Cloud", status: "completed", date: "2026-03-07T11:00:00Z", risk_level: "medium", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-006", amount: 150.00, merchant: "Twilio", status: "completed", date: "2026-03-06T13:10:00Z", risk_level: "low", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-007", amount: 9800.00, merchant: "PayPal", status: "pending", date: "2026-03-06T10:05:00Z", risk_level: "medium", payment_method: "bank_transfer", currency: "USD" },
  { id: "TXN-008", amount: 42000.00, merchant: "Cloudflare", status: "flagged", date: "2026-03-05T15:30:00Z", risk_level: "critical", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-009", amount: 560.00, merchant: "Heroku", status: "completed", date: "2026-03-05T08:45:00Z", risk_level: "low", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-010", amount: 15400.00, merchant: "Square", status: "completed", date: "2026-03-04T17:20:00Z", risk_level: "medium", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-011", amount: 2100.00, merchant: "Stripe", status: "failed", date: "2026-03-04T12:00:00Z", risk_level: "high", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-012", amount: 19.99, merchant: "Netlify", status: "completed", date: "2026-03-03T09:30:00Z", risk_level: "low", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-013", amount: 7650.00, merchant: "Amazon Web Services", status: "completed", date: "2026-03-02T14:15:00Z", risk_level: "low", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-014", amount: 33200.00, merchant: "Salesforce", status: "flagged", date: "2026-03-01T10:40:00Z", risk_level: "critical", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-015", amount: 475.00, merchant: "MongoDB Atlas", status: "completed", date: "2026-02-28T16:50:00Z", risk_level: "low", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-016", amount: 6300.00, merchant: "Datadog", status: "pending", date: "2026-02-27T11:25:00Z", risk_level: "medium", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-017", amount: 1250.00, merchant: "Twilio", status: "completed", date: "2026-02-25T13:00:00Z", risk_level: "low", payment_method: "debit_card", currency: "USD" },
  { id: "TXN-018", amount: 18900.00, merchant: "Google Cloud", status: "failed", date: "2026-02-23T09:15:00Z", risk_level: "high", payment_method: "wire_transfer", currency: "USD" },
  { id: "TXN-019", amount: 3400.00, merchant: "Shopify", status: "pending", date: "2026-02-20T15:40:00Z", risk_level: "medium", payment_method: "credit_card", currency: "USD" },
  { id: "TXN-020", amount: 11500.00, merchant: "PayPal", status: "completed", date: "2026-02-18T08:30:00Z", risk_level: "low", payment_method: "bank_transfer", currency: "USD" }
];

module.exports = payments;
