const alerts = [
  { id: "ALT-001", severity: "critical", message: "Unusual transaction volume detected from merchant Cloudflare — $42,000 wire transfer flagged", timestamp: "2026-03-09T10:15:00Z", status: "active", category: "Fraud" },
  { id: "ALT-002", severity: "critical", message: "Potential card testing detected: 12 declined micro-transactions in 3 minutes", timestamp: "2026-03-09T08:30:00Z", status: "active", category: "Fraud" },
  { id: "ALT-003", severity: "high", message: "Transaction velocity exceeded threshold for merchant Stripe — 8 transactions in 1 hour", timestamp: "2026-03-08T16:45:00Z", status: "active", category: "Account Takeover" },
  { id: "ALT-004", severity: "critical", message: "Salesforce wire transfer of $33,200 from new payment method in high-risk region", timestamp: "2026-03-08T11:00:00Z", status: "acknowledged", category: "Money Laundering" },
  { id: "ALT-005", severity: "high", message: "Suspicious login attempt from unrecognized device before $3,200 Shopify transaction", timestamp: "2026-03-08T09:20:00Z", status: "active", category: "Account Takeover" },
  { id: "ALT-006", severity: "medium", message: "Chargeback rate for merchant Square approaching 1.5% threshold", timestamp: "2026-03-07T14:30:00Z", status: "active", category: "Chargeback" },
  { id: "ALT-007", severity: "high", message: "Failed wire transfer to Google Cloud from flagged payment source", timestamp: "2026-03-07T09:00:00Z", status: "acknowledged", category: "Fraud" },
  { id: "ALT-008", severity: "medium", message: "Multiple payment method changes detected on account ACC-4521 within 24 hours", timestamp: "2026-03-06T18:15:00Z", status: "active", category: "Identity Theft" },
  { id: "ALT-009", severity: "high", message: "Geolocation mismatch: payment initiated from IP in country different from billing address", timestamp: "2026-03-06T12:40:00Z", status: "acknowledged", category: "Fraud" },
  { id: "ALT-010", severity: "medium", message: "Pending transaction TXN-007 exceeds normal PayPal volume for this account", timestamp: "2026-03-05T15:00:00Z", status: "active", category: "Money Laundering" },
  { id: "ALT-011", severity: "low", message: "Routine compliance check due for merchant Twilio — last review 90 days ago", timestamp: "2026-03-05T10:00:00Z", status: "resolved", category: "Other" },
  { id: "ALT-012", severity: "medium", message: "Elevated risk score trend: 30-day average increased from 42 to 58", timestamp: "2026-03-04T09:30:00Z", status: "active", category: "Other" },
  { id: "ALT-013", severity: "medium", message: "Refund rate anomaly detected for Shopify transactions this week", timestamp: "2026-03-03T11:20:00Z", status: "acknowledged", category: "Chargeback" },
  { id: "ALT-014", severity: "low", message: "New payment method added to account ACC-7832 — monitoring activated", timestamp: "2026-03-02T08:45:00Z", status: "resolved", category: "Identity Theft" },
  { id: "ALT-015", severity: "low", message: "Scheduled risk model recalibration completed successfully", timestamp: "2026-03-01T06:00:00Z", status: "resolved", category: "Other" }
];

module.exports = alerts;
