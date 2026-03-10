const express = require('express');
const cors = require('cors');

const paymentsRouter = require('./routes/payments');
const riskRouter = require('./routes/risk');
const alertsRouter = require('./routes/alerts');
const summaryRouter = require('./routes/summary');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/payments', paymentsRouter);
app.use('/api/risk', riskRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/summary', summaryRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
