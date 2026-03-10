import StatusBadge from '../StatusBadge/StatusBadge';
import './AlertItem.css';

function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

export default function AlertItem({ alert }) {
  return (
    <div className="alert-item">
      <div className="alert-item-header">
        <StatusBadge status={alert.severity} />
        <span className="alert-item-category">{alert.category}</span>
        <span className="alert-item-time">{timeAgo(alert.timestamp)}</span>
        <StatusBadge status={alert.status} />
      </div>
      <p className="alert-item-message">{alert.message}</p>
    </div>
  );
}
