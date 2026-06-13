import { useMemo, useState } from 'react';
import { Activity, BarChart3, Dumbbell, History, LayoutDashboard, UserRound } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { Workout } from './pages/Workout';
import { ProfilePage } from './pages/ProfilePage';
import { HistoryPage } from './pages/HistoryPage';
import { Statistics } from './pages/Statistics';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AppData, Profile, View, WeightEntry, WorkoutSession } from './types';

const defaultProfile: Profile = {
  weight: 70,
  height: 170,
  age: 25,
  gender: '',
};

const initialData: AppData = {
  profile: defaultProfile,
  weightEntries: [],
  workoutSessions: {},
};

const navItems: Array<{ id: View; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'workout', label: 'Workout', icon: Dumbbell },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'history', label: 'History', icon: History },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
];

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [data, setData] = useLocalStorage<AppData>('personal-workout-tracker', initialData);

  const sessions = useMemo(() => Object.values(data.workoutSessions), [data.workoutSessions]);

  const updateProfile = (profile: Profile) => {
    setData((current) => ({ ...current, profile }));
  };

  const addWeightEntry = (entry: WeightEntry) => {
    setData((current) => ({
      ...current,
      profile: { ...current.profile, weight: entry.weight },
      weightEntries: [...current.weightEntries.filter((item) => item.date !== entry.date), entry].sort((a, b) =>
        a.date.localeCompare(b.date),
      ),
    }));
  };

  const saveWorkoutSession = (session: WorkoutSession) => {
    setData((current) => ({
      ...current,
      workoutSessions: {
        ...current.workoutSessions,
        [session.date]: session,
      },
    }));
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Activity size={24} />
          </div>
          <div>
            <strong>Workout Tracker</strong>
            <span>Personal fitness app</span>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`nav-button ${view === item.id ? 'active' : ''}`}
                key={item.id}
                onClick={() => setView(item.id)}
                title={item.label}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main-content">
        {view === 'dashboard' && (
          <Dashboard data={data} sessions={sessions} onNavigate={setView} />
        )}
        {view === 'workout' && (
          <Workout sessions={data.workoutSessions} onSaveSession={saveWorkoutSession} />
        )}
        {view === 'profile' && (
          <ProfilePage profile={data.profile} weights={data.weightEntries} onSaveProfile={updateProfile} onAddWeight={addWeightEntry} />
        )}
        {view === 'history' && <HistoryPage sessions={sessions} />}
        {view === 'statistics' && <Statistics data={data} sessions={sessions} />}
      </main>
    </div>
  );
}
