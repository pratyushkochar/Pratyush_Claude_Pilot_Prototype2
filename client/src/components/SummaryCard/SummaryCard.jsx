import './SummaryCard.css';

export default function SummaryCard({ title, value, subtitle, color = 'var(--color-primary)' }) {
  return (
    <div className="summary-card">
      <span className="summary-card-title">{title}</span>
      <span className="summary-card-value" style={{ color }}>{value}</span>
      {subtitle && <span className="summary-card-subtitle">{subtitle}</span>}
    </div>
  );
}
