import { CalendarDays, Dumbbell, Flame, Scale } from 'lucide-react';
import { workoutPlan, getWorkoutForWeekday } from '../data/workoutPlan';
import { ProgressChart } from '../components/ProgressChart';
import { ProgressRing } from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import type { AppData, View, WorkoutSession } from '../types';
import { formatLongDate, toDateKey } from '../utils/date';
import { calculateBmi, classifyBmi } from '../utils/metrics';
import { getCompletedWorkoutCount, getSessionCompletion, getWeeklyProgress } from '../utils/stats';

type DashboardProps = {
  data: AppData;
  sessions: WorkoutSession[];
  onNavigate: (view: View) => void;
};

export function Dashboard({ data, sessions, onNavigate }: DashboardProps) {
  const todayKey = toDateKey();
  const todayWorkout = getWorkoutForWeekday(new Date().getDay());
  const todaySession = data.workoutSessions[todayKey];
  const todayProgress = getSessionCompletion(todaySession);
  const bmi = calculateBmi(data.profile);
  const weeklyProgress = getWeeklyProgress(data.workoutSessions);

  return (
    <section className="page fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">{formatLongDate()}</p>
          <h1>Overview Dashboard</h1>
        </div>
        <button className="primary-button" onClick={() => onNavigate('workout')}>
          <Dumbbell size={18} />
          Today&apos;s Workout
        </button>
      </div>

      <div className="stats-grid">
        <StatCard label="Today's Progress" value={`${todayProgress}%`} detail={todayWorkout.focus} icon={<Dumbbell size={20} />} />
        <StatCard label="Weekly Progress" value={`${weeklyProgress}%`} detail="Mon-Sat" icon={<CalendarDays size={20} />} />
        <StatCard label="Completed Sessions" value={getCompletedWorkoutCount(sessions)} detail="All time" icon={<Flame size={20} />} />
        <StatCard label="Current BMI" value={bmi || '--'} detail={classifyBmi(bmi)} icon={<Scale size={20} />} />
      </div>

      <div className="dashboard-grid">
        <section className="panel today-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Today&apos;s schedule</p>
              <h2>{todayWorkout.label} - {todayWorkout.focus}</h2>
            </div>
            <ProgressRing value={todayProgress} label="complete" />
          </div>

          {todayWorkout.isRestDay ? (
            <div className="rest-day">Rest, recover, hydrate, and get quality sleep today.</div>
          ) : (
            <div className="exercise-preview-list">
              {todayWorkout.exercises.map((exercise) => (
                <div className="exercise-preview" key={exercise.id}>
                  <span>{exercise.name}</span>
                  <strong>{exercise.target}</strong>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Training progress</p>
              <h2>Current week</h2>
            </div>
          </div>
          <ProgressChart sessions={data.workoutSessions} />
        </section>
      </div>

      <section className="panel weekly-plan">
        <div className="section-title">
          <div>
            <p className="eyebrow">Workout split</p>
            <h2>Weekly schedule</h2>
          </div>
        </div>
        <div className="week-grid">
          {workoutPlan.map((day) => (
            <div className={`week-card ${day.weekday === new Date().getDay() ? 'current' : ''}`} key={day.label}>
              <span>{day.label}</span>
              <strong>{day.focus}</strong>
              <small>{day.isRestDay ? 'Rest Day' : `${day.exercises.length} exercises`}</small>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
