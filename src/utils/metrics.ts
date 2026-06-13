import type { Profile } from '../types';

export const calculateBmi = ({ weight, height }: Profile) => {
  if (!weight || !height) {
    return 0;
  }

  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const classifyBmi = (bmi: number) => {
  if (!bmi) return 'No data yet';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 23) return 'Normal';
  if (bmi < 25) return 'At risk';
  if (bmi < 30) return 'Obese class I';
  return 'Obese class II';
};

export const getWeightTrend = (weights: number[]) => {
  if (weights.length < 2) return 0;
  return Number((weights[weights.length - 1] - weights[0]).toFixed(1));
};
