import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend
} from 'recharts';
import { fetchRiskTrend, fetchRiskCategories } from '../../api/client';
import './RiskAnalysis.css';

const COLORS = ['#ef4444', '#f59e0b', '#7c3aed', '#1a73e8', '#10b981', '#6b7280'];

export default function RiskAnalysis() {
  const [trend, setTrend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchRiskTrend(), fetchRiskCategories()])
      .then(([trendData, catData]) => {
        setTrend(trendData);
        setCategories(catData);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="risk-analysis">
      <h2 className="page-title">Risk Analysis</h2>

      <div className="chart-panel">
        <h3 className="section-title">30-Day Risk Score Trend</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1a73e8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={d => d.slice(5)} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <ReferenceLine y={60} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Threshold', fill: '#ef4444', fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="risk_score"
                stroke="#1a73e8"
                strokeWidth={2}
                fill="url(#riskGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-panel">
          <h3 className="section-title">Risk Categories (Count)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-panel">
          <h3 className="section-title">Risk Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="percentage"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
