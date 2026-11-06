// Motor de Cálculos Nutricionales y Energéticos
import { Biometrics, UserActivity, FoodEntry } from '../types';

/**
 * 1. Cálculo de Tasa Metabólica Basal (TMB)
 * - Mifflin-St Jeor (por defecto, mayor precisión en población general)
 * - Harris-Benedict revisada (Roza & Shizgal 1984)
 * - Katch-McArdle (requiere masa magra a partir de % de grasa corporal)
 */
export function calculateTMB(biometrics: Biometrics): number {
  const { sex, age, weight, height, formula, bodyFatPercentage } = biometrics;

  if (weight <= 0 || height <= 0 || age <= 0) return 0;

  switch (formula) {
    case 'mifflin': {
      // Hombres: (10 × W) + (6.25 × H) - (5 × A) + 5
      // Mujeres: (10 × W) + (6.25 × H) - (5 × A) - 161
      const base = 10 * weight + 6.25 * height - 5 * age;
      return Math.round(sex === 'male' ? base + 5 : base - 161);
    }

    case 'harris': {
      // Hombres: 88.362 + (13.397 × W) + (4.799 × H) - (5.677 × A)
      // Mujeres: 447.593 + (9.247 × W) + (3.098 × H) - (4.330 × A)
      if (sex === 'male') {
        return Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age);
      } else {
        return Math.round(447.593 + 9.247 * weight + 3.098 * height - 4.330 * age);
      }
    }

    case 'katch': {
      // Katch-McArdle: BMR = 370 + (21.6 × LBM)
      // LBM = W × (1 - (BF / 100))
      if (bodyFatPercentage !== undefined && bodyFatPercentage > 0 && bodyFatPercentage < 70) {
        const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
        return Math.round(370 + 21.6 * leanBodyMass);
      }
      // Fallback a Mifflin si no se proporciona % de grasa
      const base = 10 * weight + 6.25 * height - 5 * age;
      return Math.round(sex === 'male' ? base + 5 : base - 161);
    }

    default:
      return 0;
  }
}

/**
 * 2. Cálculo de Gasto por Actividad mediante METs (Compendio de Ainsworth)
 * Fórmula: Calorías quemadas = MET × Peso (kg) × Tiempo (horas)
 */
export function calculateActivityCalories(
  met: number,
  weightKg: number,
  durationMinutes: number
): number {
  if (met <= 0 || weightKg <= 0 || durationMinutes <= 0) return 0;
  const hours = durationMinutes / 60;
  const calories = met * weightKg * hours;
  return Math.round(calories);
}

/**
 * 3. Cálculo de Gasto Calórico Total Diario (GETD) mediante el ciclo de 24 horas por METs
 * 1 MET = 1 kcal/kg/hora (~gasto en reposo estandarizado).
 * En un ciclo completo de 24 horas, la sumatoria de METs cubre tanto el gasto en reposo como el activo.
 * GETD = Gasto METs 24h + ETA (Efecto Térmico de los Alimentos ~10%)
 */
export interface GETDResult {
  totalMinutesAssigned: number;
  is24hComplete: boolean;
  activityExpenditure: number; // Sumatoria de METs de las actividades registradas
  eta: number;                 // 10% del gasto total
  totalGETD: number;           // activityExpenditure + eta
  tmbReference: number;        // TMB de referencia calculada
}

export function calculateFullGETD(
  activities: UserActivity[],
  biometrics: Biometrics
): GETDResult {
  const tmb = calculateTMB(biometrics);
  const totalMinutes = activities.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const activityExpenditure = activities.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  // ETA: 10% del gasto
  const eta = Math.round(activityExpenditure * 0.10);
  const totalGETD = Math.round(activityExpenditure + eta);

  return {
    totalMinutesAssigned: totalMinutes,
    is24hComplete: totalMinutes >= 1430 && totalMinutes <= 1450, // ~1440 min (24h) con pequeño margen
    activityExpenditure,
    eta,
    totalGETD,
    tmbReference: tmb,
  };
}

/**
 * 4. Sumatoria de Ingesta Nutricional en Tiempo Real
 */
export interface IntakeTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function calculateIntakeTotals(entries: FoodEntry[]): IntakeTotals {
  return entries.reduce(
    (acc, curr) => ({
      calories: Math.round(acc.calories + curr.calories),
      protein: Number((acc.protein + curr.protein).toFixed(1)),
      carbs: Number((acc.carbs + curr.carbs).toFixed(1)),
      fat: Number((acc.fat + curr.fat).toFixed(1)),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

