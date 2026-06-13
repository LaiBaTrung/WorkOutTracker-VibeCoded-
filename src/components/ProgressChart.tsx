import { getWeekDates } from '../utils/date';
import { getSessionCompletion } from '../utils/stats';
import type { WorkoutSession } from '../types';

type ProgressChartProps = {
  sessions: Record<string, WorkoutSession>;
};

export function ProgressChart({ sessions }: ProgressChartProps) {
  const days = getWeekDates();

  return (
    <div className="chart progress-chart">
      {days.map((dateKey) => {
        const value = getSessionCompletion(sessions[dateKey]);
        return (
          <div className="progress-column" key={dateKey}>
            <div className="bar-track">
              <div className="bar-fill orange" style={{ height: `${Math.max(value, 4)}%` }} />
            </div>
            <strong>{value}%</strong>
            <small>{new Date(`${dateKey}T00:00:00`).toLocaleDateString('en-US', { weekday: 'short' })}</small>
          </div>
        );
      })}
    </div>
  );
}
