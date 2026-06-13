import type { ReactNode } from 'react';

type StatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, detail, icon }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  );
}
