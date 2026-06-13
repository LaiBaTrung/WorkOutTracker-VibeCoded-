import { Activity, CheckCircle2, Dumbbell, Flame } from 'lucide-react';
import { ProgressChart } from '../components/ProgressChart';
import { StatCard } from '../components/StatCard';
import { WeightChart } from '../components/WeightChart';
import type { AppData, WorkoutSession } from '../types';
import { getCompletedExerciseCount, getCompletedWorkoutCount, getWorkoutStreak } from '../utils/stats';

type StatisticsProps = {
  data: AppData;
  sessions: WorkoutSession[];
};

export function Statistics({ data, sessions }: StatisticsProps) {
  return (
    <section className="page fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Statistics</p>
          <h1>Progress Statistics</h1>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Sessions" value={sessions.length} detail="Saved workouts" icon={<Dumbbell size={20} />} />
        <StatCard label="Completed Sessions" value={getCompletedWorkoutCount(sessions)} detail="100% completed" icon={<CheckCircle2 size={20} />} />
        <StatCard label="Exercises Done" value={getCompletedExerciseCount(sessions)} detail="All exercises" icon={<Activity size={20} />} />
        <StatCard label="Workout Streak" value={getWorkoutStreak(data.workoutSessions)} detail="Consecutive days" icon={<Flame size={20} />} />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Workout chart</p>
              <h2>This week&apos;s progress</h2>
            </div>
          </div>
          <ProgressChart sessions={data.workoutSessions} />
        </section>
        <section className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Weight chart</p>
              <h2>Last 12 entries</h2>
            </div>
          </div>
          <WeightChart entries={data.weightEntries} />
        </section>
      </div>
    </section>
  );
}
