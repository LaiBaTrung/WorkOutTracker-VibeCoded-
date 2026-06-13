import { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { WeightChart } from '../components/WeightChart';
import type { Gender, Profile, WeightEntry } from '../types';
import { toDateKey } from '../utils/date';
import { calculateBmi, classifyBmi, getWeightTrend } from '../utils/metrics';

type ProfilePageProps = {
  profile: Profile;
  weights: WeightEntry[];
  onSaveProfile: (profile: Profile) => void;
  onAddWeight: (entry: WeightEntry) => void;
};

export function ProfilePage({ profile, weights, onSaveProfile, onAddWeight }: ProfilePageProps) {
  const [form, setForm] = useState(profile);
  const [weightDate, setWeightDate] = useState(toDateKey());
  const [weightValue, setWeightValue] = useState(String(profile.weight || ''));
  const bmi = calculateBmi(form);
  const trend = getWeightTrend(weights.map((entry) => entry.weight));

  const saveProfile = () => {
    onSaveProfile(form);
  };

  const addWeight = () => {
    const parsedWeight = Number(weightValue);
    if (!parsedWeight || !weightDate) return;

    onAddWeight({
      id: weightDate,
      date: weightDate,
      weight: parsedWeight,
    });
  };

  return (
    <section className="page fade-in">
      <div className="page-header">
        <div>
          <p className="eyebrow">Personal profile</p>
          <h1>Profile and Weight</h1>
        </div>
        <button className="primary-button" onClick={saveProfile}>
          <Save size={18} />
          Save Profile
        </button>
      </div>

      <div className="profile-grid">
        <section className="panel">
          <div className="form-grid">
            <label>
              Weight (kg)
              <input type="number" value={form.weight} onChange={(event) => setForm({ ...form, weight: Number(event.target.value) })} />
            </label>
            <label>
              Height (cm)
              <input type="number" value={form.height} onChange={(event) => setForm({ ...form, height: Number(event.target.value) })} />
            </label>
            <label>
              Age
              <input type="number" value={form.age} onChange={(event) => setForm({ ...form, age: Number(event.target.value) })} />
            </label>
            <label>
              Gender
              <select value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value as Gender })}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
        </section>

        <section className="panel bmi-panel">
          <p className="eyebrow">BMI</p>
          <strong>{bmi || '--'}</strong>
          <span>{classifyBmi(bmi)}</span>
          <small>Weight change: {trend > 0 ? '+' : ''}{trend}kg</small>
        </section>
      </div>

      <section className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Weight tracking</p>
            <h2>Add daily or weekly entries</h2>
          </div>
        </div>
        <div className="weight-entry-row">
          <input type="date" value={weightDate} onChange={(event) => setWeightDate(event.target.value)} />
          <input type="number" value={weightValue} onChange={(event) => setWeightValue(event.target.value)} placeholder="Weight in kg" />
          <button className="secondary-button" onClick={addWeight}>
            <Plus size={18} />
            Add
          </button>
        </div>
        <WeightChart entries={weights} />
      </section>
    </section>
  );
}
