import type { CSSProperties } from 'react';

type ProgressRingProps = {
  value: number;
  label: string;
};

export function ProgressRing({ value, label }: ProgressRingProps) {
  return (
    <div className="progress-ring" style={{ '--progress': `${value}%` } as CSSProperties}>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
