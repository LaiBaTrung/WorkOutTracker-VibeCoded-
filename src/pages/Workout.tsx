import { useMemo, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';
import { getWorkoutForWeekday } from '../data/workoutPlan';
import type { ExerciseLog, WorkoutSession } from '../types';
import { toDateKey } from '../utils/date';
import { getSessionCompletion } from '../utils/stats';

type WorkoutProps = {
  sessions: Record<string, WorkoutSession>;
  onSaveSession: (session: WorkoutSession) => void;
};

export function Workout({ sessions, onSaveSession }: WorkoutProps) {
  const todayKey = toDateKey();
  const workout = getWorkoutForWeekday(new Date().getDay());
  const existingSession = sessions[todayKey];
  const [showDone, setShowDone] = useState(false);

  const defaultLogs = useMemo<ExerciseLog[]>(
    () =>
      workout.exercises.map((exercise) => ({
        exerciseId: exercise.id,
        completed: false,
        reps: '',
        weight: '',
        notes: '',
      })),
    [workout.exercises],
  );

  const [logs, setLogs] = useState<ExerciseLog[]>(existingSession?.exercises ?? defaultLogs);

  const completion = workout.isRestDay ? 100 : Math.round((logs.filter((log) => log.completed).length / logs.length) * 100);

  const updateLog = (exerciseId: string, patch: Partial<ExerciseLog>) => {
    setLogs((current) =>
      current.map((log) => (log.exerciseId === exerciseId ? { ...log, ...patch } : log)),
    );
  };

  const saveSession = () => {
    const session: WorkoutSession = {
      id: todayKey,
      date: todayKey,
      weekday: new Date().getDay(),
      focus: workout.focus,
      exercises: logs,
      completedAt: completion === 100 ? new Date().toISOString() : undefined,
    };

    onSaveSession(session);
    setShowDone(completion === 100);
  };

  return (
    <section className="page fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Workout Tracker</p>
          <h1>{workout.label} - {workout.focus}</h1>
        </div>
        <div className="completion-badge">{completion}% complete</div>
      </div>

      {showDone && (
        <div className="success-banner">
          <CheckCircle2 size={20} />
          Workout 100% complete. Strong finish!
        </div>
      )}

      {workout.isRestDay ? (
        <section className="panel rest-day">Sunday is a rest day. Hydrate, stretch lightly, and recover.</section>
      ) : (
        <section className="workout-list">
          {workout.exercises.map((exercise) => {
            const log = logs.find((item) => item.exerciseId === exercise.id)!;
            return (
              <article className={`exercise-card ${log.completed ? 'done' : ''}`} key={exercise.id}>
                <label className="exercise-check">
                  <input
                    type="checkbox"
                    checked={log.completed}
                    onChange={(event) => updateLog(exercise.id, { completed: event.target.checked })}
                  />
                  <span />
                </label>
                <div className="exercise-main">
                  <div className="exercise-heading">
                    <div>
                      <h2>{exercise.name}</h2>
                      <p>{exercise.target}</p>
                    </div>
                  </div>
                  <div className="log-grid">
                    <label>
                      Actual reps
                      <input value={log.reps} onChange={(event) => updateLog(exercise.id, { reps: event.target.value })} placeholder="Ex: 15, 14, 12" />
                    </label>
                    <label>
                      Weight used
                      <input value={log.weight} onChange={(event) => updateLog(exercise.id, { weight: event.target.value })} placeholder="Ex: 12kg" />
                    </label>
                    <label className="notes-field">
                      Notes
                      <input value={log.notes} onChange={(event) => updateLog(exercise.id, { notes: event.target.value })} placeholder="Feeling, form, RPE..." />
                    </label>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <button className="floating-save primary-button" onClick={saveSession}>
        <Save size={18} />
        Save Workout
      </button>
    </section>
  );
}
