export type Gender = 'male' | 'female' | 'other' | '';

export type Profile = {
  weight: number;
  height: number;
  age: number;
  gender: Gender;
};

export type WeightEntry = {
  id: string;
  date: string;
  weight: number;
};

export type WorkoutExercise = {
  id: string;
  name: string;
  target: string;
};

export type WorkoutDay = {
  weekday: number;
  label: string;
  focus: string;
  exercises: WorkoutExercise[];
  isRestDay?: boolean;
};

export type ExerciseLog = {
  exerciseId: string;
  completed: boolean;
  reps: string;
  weight: string;
  notes: string;
};

export type WorkoutSession = {
  id: string;
  date: string;
  weekday: number;
  focus: string;
  exercises: ExerciseLog[];
  completedAt?: string;
};

export type AppData = {
  profile: Profile;
  weightEntries: WeightEntry[];
  workoutSessions: Record<string, WorkoutSession>;
};

export type View = 'dashboard' | 'workout' | 'profile' | 'history' | 'statistics';
