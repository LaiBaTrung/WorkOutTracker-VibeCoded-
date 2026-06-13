import { useState } from 'react';
import { Search } from 'lucide-react';
import type { WorkoutSession } from '../types';
import { filterSessions, getSessionCompletion } from '../utils/stats';

type HistoryPageProps = {
  sessions: WorkoutSession[];
};

export function HistoryPage({ sessions }: HistoryPageProps) {
  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('week');
  const [search, setSearch] = useState('');
  const filtered = filterSessions(sessions, filter, search);

  return (
    <section className="page fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Workout History</p>
          <h1>Workout History</h1>
        </div>
      </div>

      <div className="toolbar">
        <div className="segmented">
          {(['day', 'week', 'month'] as const).map((item) => (
            <button className={filter === item ? 'active' : ''} key={item} onClick={() => setFilter(item)}>
              {item === 'day' ? 'Day' : item === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search focus or notes..." />
        </label>
      </div>

      <div className="history-list">
        {filtered.length === 0 ? (
          <div className="empty-state">No matching workout sessions yet.</div>
        ) : (
          filtered.map((session) => (
            <article className="history-card" key={session.id}>
              <div>
                <span>{new Date(`${session.date}T00:00:00`).toLocaleDateString('en-US')}</span>
                <h2>{session.focus}</h2>
              </div>
              <strong>{getSessionCompletion(session)}%</strong>
              <small>{session.exercises.filter((exercise) => exercise.completed).length}/{session.exercises.length} exercises completed</small>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
