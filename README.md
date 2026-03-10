# Risk & Payments Dashboard

A full-stack dashboard for monitoring payment transactions, risk metrics, and security alerts.

## Tech Stack

- **Frontend**: React 18, React Router, Recharts, Vite
- **Backend**: Node.js, Express

## Getting Started

```bash
# Install all dependencies
npm run install:all

# Start both client and server
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Features

- **Overview** — Summary cards, 30-day risk score trend chart, recent alerts
- **Payments** — Filterable table of transactions with status and risk level badges
- **Risk Analysis** — Area chart for risk trends, bar chart and pie chart for risk categories
- **Alerts** — Filterable alerts list with severity and status tabs

## API Endpoints

- `GET /api/summary` — Dashboard summary statistics
- `GET /api/payments` — Payment transactions (filters: `?status=`, `?risk_level=`)
- `GET /api/risk/trend` — 30-day risk score trend
- `GET /api/risk/categories` — Risk category breakdown
- `GET /api/alerts` — Alerts list (filters: `?severity=`, `?status=`)
