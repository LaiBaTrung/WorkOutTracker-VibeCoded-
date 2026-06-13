import type { WorkoutDay } from '../types';

export const workoutPlan: WorkoutDay[] = [
  {
    weekday: 1,
    label: 'Monday',
    focus: 'Push',
    exercises: [
      { id: 'mon-push-up', name: 'Push-up', target: '4 x max' },
      { id: 'mon-floor-press', name: 'Dumbbell Floor Press', target: '4 x 12-20' },
      { id: 'mon-shoulder-press', name: 'Dumbbell Shoulder Press', target: '4 x 12-15' },
      { id: 'mon-lateral-raise', name: 'Lateral Raise', target: '4 x 15-20' },
      { id: 'mon-tricep-extension', name: 'Overhead Tricep Extension', target: '3 x 15-20' },
    ],
  },
  {
    weekday: 2,
    label: 'Tuesday',
    focus: 'Pull',
    exercises: [
      { id: 'tue-one-arm-row', name: 'One-arm Dumbbell Row', target: '4 x 12-20' },
      { id: 'tue-bent-row', name: 'Bent-over Row', target: '4 x 12-20' },
      { id: 'tue-shrug', name: 'Dumbbell Shrug', target: '4 x 15-20' },
      { id: 'tue-curl', name: 'Dumbbell Curl', target: '4 x 12-20' },
      { id: 'tue-hammer-curl', name: 'Hammer Curl', target: '3 x 12-20' },
    ],
  },
  {
    weekday: 3,
    label: 'Wednesday',
    focus: 'Legs',
    exercises: [
      { id: 'wed-goblet-squat', name: 'Goblet Squat', target: '5 x 15-25' },
      { id: 'wed-split-squat', name: 'Bulgarian Split Squat', target: '4 x 12-15 each leg' },
      { id: 'wed-rdl', name: 'Romanian Deadlift', target: '4 x 15-20' },
      { id: 'wed-calf', name: 'Calf Raise', target: '5 x 20-30' },
      { id: 'wed-plank', name: 'Plank', target: '3 sets' },
      { id: 'wed-leg-raise', name: 'Leg Raise', target: '3 x 15-20' },
    ],
  },
  {
    weekday: 4,
    label: 'Thursday',
    focus: 'Push',
    exercises: [
      { id: 'thu-diamond', name: 'Diamond Push-up', target: '4 x max' },
      { id: 'thu-floor-press', name: 'Floor Press', target: '4 x 12-20' },
      { id: 'thu-arnold', name: 'Arnold Press', target: '4 x 12-15' },
      { id: 'thu-lateral', name: 'Lateral Raise', target: '4 x 15-20' },
      { id: 'thu-tricep', name: 'Tricep Extension', target: '3 x 15-20' },
    ],
  },
  {
    weekday: 5,
    label: 'Friday',
    focus: 'Pull',
    exercises: [
      { id: 'fri-one-arm-row', name: 'One-arm Row', target: '4 x 12-20' },
      { id: 'fri-bent-row', name: 'Bent-over Row', target: '4 x 12-20' },
      { id: 'fri-rear-delt', name: 'Rear Delt Fly', target: '4 x 15-20' },
      { id: 'fri-curl', name: 'Dumbbell Curl', target: '4 x 12-20' },
      { id: 'fri-hammer', name: 'Hammer Curl', target: '3 x 12-20' },
    ],
  },
  {
    weekday: 6,
    label: 'Saturday',
    focus: 'Legs',
    exercises: [
      { id: 'sat-goblet', name: 'Goblet Squat', target: '5 x 20' },
      { id: 'sat-lunge', name: 'Walking Lunge', target: '4 x 12 each leg' },
      { id: 'sat-rdl', name: 'Romanian Deadlift', target: '4 x 15-20' },
      { id: 'sat-calf', name: 'Calf Raise', target: '5 x 20-30' },
      { id: 'sat-twist', name: 'Russian Twist', target: '3 x 20' },
      { id: 'sat-plank', name: 'Plank', target: '3 sets' },
    ],
  },
  {
    weekday: 0,
    label: 'Sunday',
    focus: 'Rest Day',
    isRestDay: true,
    exercises: [],
  },
];

export const getWorkoutForWeekday = (weekday: number) =>
  workoutPlan.find((day) => day.weekday === weekday) ?? workoutPlan[0];
