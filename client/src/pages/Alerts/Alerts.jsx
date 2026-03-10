import { useState, useEffect } from 'react';
import AlertItem from '../../components/AlertItem/AlertItem';
import { fetchAlerts } from '../../api/client';
import './Alerts.css';

const severityLevels = ['all', 'critical', 'high', 'medium', 'low'];
const statusOptions = ['all', 'active', 'acknowledged', 'resolved'];

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAlerts().then(data => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  const filtered = alerts.filter(a => {
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="alerts-page">
      <h2 className="page-title">Alerts</h2>

      <div className="filter-tabs">
        <div className="filter-group">
          <span className="filter-label">Severity:</span>
          {severityLevels.map(level => (
            <button
              key={level}
              className={`filter-tab ${severityFilter === level ? 'active' : ''}`}
              onClick={() => setSeverityFilter(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Status:</span>
          {statusOptions.map(status => (
            <button
              key={status}
              className={`filter-tab ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="alerts-list">
        {filtered.map(alert => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">No alerts match the selected filters.</div>
        )}
      </div>
    </div>
  );
}
