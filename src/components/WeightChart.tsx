import type { WeightEntry } from '../types';

type WeightChartProps = {
  entries: WeightEntry[];
};

export function WeightChart({ entries }: WeightChartProps) {
  const recent = entries.slice(-12);
  const weights = recent.map((entry) => entry.weight);
  const min = Math.min(...weights, 0);
  const max = Math.max(...weights, 100);
  const range = Math.max(max - min, 1);

  if (recent.length === 0) {
    return <div className="empty-state">No weight data yet.</div>;
  }

  return (
    <div className="chart bars-chart">
      {recent.map((entry) => {
        const height = 20 + ((entry.weight - min) / range) * 80;
        return (
          <div className="bar-item" key={entry.id}>
            <span className="bar-value">{entry.weight}kg</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ height: `${height}%` }} />
            </div>
            <small>{entry.date.slice(5)}</small>
          </div>
        );
      })}
    </div>
  );
}
