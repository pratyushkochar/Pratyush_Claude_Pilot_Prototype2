import './StatusBadge.css';

const colorMap = {
  completed: 'success',
  pending: 'warning',
  failed: 'danger',
  flagged: 'critical',
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'critical',
  active: 'danger',
  acknowledged: 'warning',
  resolved: 'success',
};

export default function StatusBadge({ status }) {
  const variant = colorMap[status] || 'default';
  return <span className={`status-badge status-badge--${variant}`}>{status}</span>;
}
