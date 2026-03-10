import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import AlertItem from '../../components/AlertItem/AlertItem';
import { fetchSummary, fetchRiskTrend, fetchAlerts } from '../../api/client';
import './Overview.css';

export default function Overview() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSummary(), fetchRiskTrend(), fetchAlerts()])
      .then(([summaryData, trendData, alertsData]) => {
        setSummary(summaryData);
        setTrend(trendData);
        setRecentAlerts(alertsData.slice(0, 5));
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="overview">
      <h2 className="page-title">Overview</h2>

      <div className="summary-grid">
        <SummaryCard
          title="Total Payments"
          value={summary.totalPayments}
          subtitle={`$${summary.totalVolume.toLocaleString()} total volume`}
        />
        <SummaryCard
          title="Risk Score"
          value={summary.averageRiskScore}
          subtitle="Current risk score"
          color={summary.averageRiskScore > 60 ? 'var(--color-danger)' : 'var(--color-warning)'}
        />
        <SummaryCard
          title="Active Alerts"
          value={summary.activeAlerts}
          subtitle={`${summary.flaggedTransactions} flagged transactions`}
          color="var(--color-danger)"
        />
        <SummaryCard
          title="Success Rate"
          value={`${summary.successRate}%`}
          subtitle="Payment completion rate"
          color="var(--color-success)"
        />
      </div>

      <div className="chart-section">
        <h3 className="section-title">30-Day Risk Score Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={d => d.slice(5)}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="risk_score"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="alerts-section">
        <h3 className="section-title">Recent Alerts</h3>
        <div className="alerts-list">
          {recentAlerts.map(alert => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
