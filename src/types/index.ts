// Tipos principales para NutriCalc Pro

export type Sex = 'male' | 'female';
export type TMBFormula = 'mifflin' | 'harris' | 'katch';
export type FoodCategory = 'proteina' | 'carbohidrato' | 'grasa' | 'verdura' | 'fruta' | 'lacteo';
export type MealType = 'desayuno' | 'almuerzo' | 'cena' | 'snack';

export type PortionType = 
  | 'plate_quarter'    // 1/4 de plato
  | 'plate_half'       // 1/2 plato
  | 'plate_three_quarters' // 3/4 de plato
  | 'palm'             // 1 palma de mano (~proteínas)
  | 'fist'             // 1 puño (~carbohidratos/frutas)
  | 'thumb'            // 1 pulgar (~grasas)
  | 'cup'              // 1 taza estándar
  | 'tablespoon'       // 1 cucharada sopera
  | 'teaspoon'         // 1 cucharadita
  | 'unit'             // 1 pieza / unidad
  | 'slice'            // 1 rebanada
  | 'grams';           // Gramos exactos

export interface VisualPortion {
  id: string;
  label: string;          // Ej: "1/4 de plato", "1 puño", "1 palma", "1 taza"
  type: PortionType;
  approxGrams: number;    // Gramos correspondientes para este alimento
  description?: string;   // Ej: "Porción de referencia de guarnición"
}

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  isCustom?: boolean;      // Creado por el nutricionista
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  visualPortions: VisualPortion[];
  notes?: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  met: number;
  description?: string;
}

export interface UserActivity {
  id: string;
  activityId: string;
  name: string;
  met: number;
  durationMinutes: number;
  caloriesBurned: number;
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  category: FoodCategory;
  meal: MealType;
  grams: number;
  portionUsed?: string;     // Ej: "1/4 de plato (150g)"
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Biometrics {
  sex: Sex;
  age: number;
  weight: number;           // en kg
  height: number;           // en cm
  bodyFatPercentage?: number; // opcional para Katch-McArdle
  formula: TMBFormula;
}

export interface Patient {
  id: string;
  fullName: string;
  birthDate?: string;
  sex: Sex;
  age: number;
  height: number;           // cm
  phone?: string;
  email?: string;
  objective?: 'perdida_grasa' | 'mantenimiento' | 'hipertrofia' | 'rendimiento';
  clinicalNotes?: string;
  createdAt: string;
}

export interface ConsultationRecord {
  id: string;
  patientId: string;
  date: string;
  biometrics: Biometrics;
  tmb: number;
  activityExpenditure: number;
  eta: number;              // Efecto térmico de los alimentos
  getd: number;             // Gasto energético total diario
  activities: UserActivity[];
  foodEntries: FoodEntry[];
  totalCaloriesIn: number;
  totalProteinIn: number;
  totalCarbsIn: number;
  totalFatIn: number;
  balanceCalories: number;  // totalCaloriesIn - getd (+ superávit, - déficit)
  notes?: string;
}

export interface ExchangeSuggestion {
  food: Food;
  grams: number;
  portionLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  caloriesDiffPercent: number; // Porcentaje de diferencia calórica
  isExactMatch: boolean;       // Dentro de ±5%
}

