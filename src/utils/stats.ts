import type { WorkoutSession } from '../types';
import { getWeekDates, isSameMonth, toDateKey } from './date';

export const getSessionCompletion = (session?: WorkoutSession) => {
  if (!session || session.exercises.length === 0) return 0;
  const completed = session.exercises.filter((exercise) => exercise.completed).length;
  return Math.round((completed / session.exercises.length) * 100);
};

export const getCompletedExerciseCount = (sessions: WorkoutSession[]) =>
  sessions.reduce((total, session) => total + session.exercises.filter((exercise) => exercise.completed).length, 0);

export const getCompletedWorkoutCount = (sessions: WorkoutSession[]) =>
  sessions.filter((session) => getSessionCompletion(session) === 100).length;

export const getWeeklyProgress = (sessions: Record<string, WorkoutSession>, date = new Date()) => {
  const weekDates = getWeekDates(date);
  const workoutDays = weekDates.filter((dateKey) => new Date(`${dateKey}T00:00:00`).getDay() !== 0);
  const completed = workoutDays.filter((dateKey) => getSessionCompletion(sessions[dateKey]) === 100).length;
  return Math.round((completed / workoutDays.length) * 100);
};

export const getWorkoutStreak = (sessions: Record<string, WorkoutSession>) => {
  let streak = 0;
  const cursor = new Date();

  for (let index = 0; index < 365; index += 1) {
    const key = toDateKey(cursor);
    const weekday = cursor.getDay();

    if (weekday !== 0) {
      if (getSessionCompletion(sessions[key]) === 100) {
        streak += 1;
      } else {
        break;
      }
    }

    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const filterSessions = (sessions: WorkoutSession[], filter: 'day' | 'week' | 'month', search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  const weekDates = new Set(getWeekDates());

  return sessions
    .filter((session) => {
      if (filter === 'day' && session.date !== toDateKey()) return false;
      if (filter === 'week' && !weekDates.has(session.date)) return false;
      if (filter === 'month' && !isSameMonth(session.date)) return false;
      if (!normalizedSearch) return true;

      return (
        session.focus.toLowerCase().includes(normalizedSearch) ||
        session.exercises.some((exercise) => exercise.notes.toLowerCase().includes(normalizedSearch))
      );
    })
    .sort((a, b) => b.date.localeCompare(a.date));
};
