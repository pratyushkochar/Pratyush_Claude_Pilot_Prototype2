import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { fetchPayments } from '../../api/client';
import './Payments.css';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (statusFilter) params.status = statusFilter;
    if (riskFilter) params.risk_level = riskFilter;

    fetchPayments(params).then(data => {
      setPayments(data);
      setLoading(false);
    });
  }, [statusFilter, riskFilter]);

  return (
    <div className="payments">
      <h2 className="page-title">Payments</h2>

      <div className="filters">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="flagged">Flagged</option>
        </select>

        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
          <option value="">All Risk Levels</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="table-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Risk Level</th>
                <th>Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td className="mono">{p.id}</td>
                  <td>{p.merchant}</td>
                  <td className="mono">${p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td><StatusBadge status={p.risk_level} /></td>
                  <td className="capitalize">{p.payment_method.replace('_', ' ')}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && (
            <div className="empty-state">No payments match the selected filters.</div>
          )}
        </div>
      )}
    </div>
  );
}
