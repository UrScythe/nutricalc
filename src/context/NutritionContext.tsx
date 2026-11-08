'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import {
  Biometrics,
  UserActivity,
  FoodEntry,
  Food,
  ConsultationRecord,
  MealType,
  ExchangeSuggestion,
} from '../types';
import {
  calculateTMB,
  calculateActivityCalories,
  calculateFullGETD,
  calculateIntakeTotals,
  GETDResult,
  IntakeTotals,
} from '../lib/calculations';
import { getStoredFoods, saveFood as persistFood, deleteFood as removeStoredFood, resetFoodsToDefault } from '../services/dataService';
import { usePatient } from './PatientContext';

interface NutritionContextType {
  // Navegación
  currentStep: 1 | 2 | 3;
  setCurrentStep: (step: 1 | 2 | 3) => void;

  // Módulo A: Perfil y Gasto
  biometrics: Biometrics;
  setBiometrics: React.Dispatch<React.SetStateAction<Biometrics>>;
  updateBiometricsField: <K extends keyof Biometrics>(field: K, value: Biometrics[K]) => void;
  activities: UserActivity[];
  addActivity: (activityId: string, name: string, met: number, durationMinutes: number) => void;
  removeActivity: (id: string) => void;
  updateActivityDuration: (id: string, durationMinutes: number) => void;
  loadPreset24h: () => void;
  clearActivities: () => void;
  getdResult: GETDResult;

  // Módulo B: Ingesta
  selectedMeal: MealType;
  setSelectedMeal: (meal: MealType) => void;
  foodEntries: FoodEntry[];
  addFoodEntry: (
    food: Food,
    grams: number,
    portionLabel?: string,
    targetMeal?: MealType
  ) => void;
  removeFoodEntry: (entryId: string) => void;
  clearFoodEntries: () => void;
  intakeTotals: IntakeTotals;

  // Módulo C: Intercambios
  activeEntryToExchange: FoodEntry | null;
  setActiveEntryToExchange: (entry: FoodEntry | null) => void;
  applyExchange: (oldEntryId: string, suggestion: ExchangeSuggestion) => void;

  // Catálogo de alimentos (propios + predeterminados)
  availableFoods: Food[];
  addCustomFood: (newFood: Food) => void;
  deleteCustomFood: (foodId: string) => void;
  resetFoods: () => void;

  // Guardado en historial
  saveCurrentAsConsultation: (notes?: string) => ConsultationRecord | null;
  loadConsultationIntoSession: (record: ConsultationRecord) => void;
  resetCurrentSession: () => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export function NutritionProvider({ children }: { children: ReactNode }) {
  const { activePatient, saveConsultation } = usePatient();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Biometría
  const [biometrics, setBiometrics] = useState<Biometrics>({
    sex: 'male',
    age: 30,
    weight: 75,
    height: 175,
    bodyFatPercentage: undefined,
    formula: 'mifflin',
  });

  // Actividades METs
  const [activities, setActivities] = useState<UserActivity[]>([
    {
      id: 'init_sleep',
      activityId: 'act_01',
      name: 'Dormir / Sueño nocturno',
      met: 0.9,
      durationMinutes: 480, // 8h
      caloriesBurned: Math.round(0.9 * 75 * 8),
    },
    {
      id: 'init_office',
      activityId: 'act_04',
      name: 'Trabajo de oficina / Computador',
      met: 1.3,
      durationMinutes: 480, // 8h
      caloriesBurned: Math.round(1.3 * 75 * 8),
    },
    {
      id: 'init_sitting',
      activityId: 'act_03',
      name: 'Sentado pasivo (descanso, TV, comer)',
      met: 1.0,
      durationMinutes: 360, // 6h
      caloriesBurned: Math.round(1.0 * 75 * 6),
    },
    {
      id: 'init_walk',
      activityId: 'act_10',
      name: 'Caminata a paso moderado',
      met: 3.5,
      durationMinutes: 60, // 1h
      caloriesBurned: Math.round(3.5 * 75 * 1),
    },
    {
      id: 'init_weights',
      activityId: 'act_13',
      name: 'Entrenamiento de pesas intenso',
      met: 6.0,
      durationMinutes: 60, // 1h
      caloriesBurned: Math.round(6.0 * 75 * 1),
    },
  ]);

  // Alimentos registrados
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('almuerzo');
  const [activeEntryToExchange, setActiveEntryToExchange] = useState<FoodEntry | null>(null);

  // Catálogo de alimentos
  const [availableFoods, setAvailableFoods] = useState<Food[]>([]);

  // Sincronizar catálogo al inicio
  useEffect(() => {
    setAvailableFoods(getStoredFoods());
  }, []);

  // Sincronizar biometría cuando cambia el paciente activo
  useEffect(() => {
    if (activePatient) {
      setBiometrics((prev) => ({
        ...prev,
        sex: activePatient.sex,
        age: activePatient.age || prev.age,
        height: activePatient.height || prev.height,
      }));
    }
  }, [activePatient]);

  // Recalcular calorías quemadas de las actividades si cambia el peso
  useEffect(() => {
    setActivities((prev) =>
      prev.map((act) => ({
        ...act,
        caloriesBurned: calculateActivityCalories(act.met, biometrics.weight, act.durationMinutes),
      }))
    );
  }, [biometrics.weight]);

  const updateBiometricsField = <K extends keyof Biometrics>(field: K, value: Biometrics[K]) => {
    setBiometrics((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Gestión de Actividades
  const addActivity = (
    activityId: string,
    name: string,
    met: number,
    durationMinutes: number
  ) => {
    const calories = calculateActivityCalories(met, biometrics.weight, durationMinutes);
    const newActivity: UserActivity = {
      id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      activityId,
      name,
      met,
      durationMinutes,
      caloriesBurned: calories,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const updateActivityDuration = (id: string, durationMinutes: number) => {
    setActivities((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            durationMinutes,
            caloriesBurned: calculateActivityCalories(a.met, biometrics.weight, durationMinutes),
          };
        }
        return a;
      })
    );
  };

  const loadPreset24h = () => {
    const w = biometrics.weight || 70;
    setActivities([
      {
        id: 'p_sleep',
        activityId: 'act_01',
        name: 'Dormir / Sueño nocturno',
        met: 0.9,
        durationMinutes: 480, // 8h
        caloriesBurned: calculateActivityCalories(0.9, w, 480),
      },
      {
        id: 'p_office',
        activityId: 'act_04',
        name: 'Trabajo de oficina / Computador',
        met: 1.3,
        durationMinutes: 480, // 8h
        caloriesBurned: calculateActivityCalories(1.3, w, 480),
      },
      {
        id: 'p_sitting',
        activityId: 'act_03',
        name: 'Sentado pasivo (descanso, TV, comer)',
        met: 1.0,
        durationMinutes: 360, // 6h
        caloriesBurned: calculateActivityCalories(1.0, w, 360),
      },
      {
        id: 'p_walk',
        activityId: 'act_10',
        name: 'Caminata a paso moderado',
        met: 3.5,
        durationMinutes: 60, // 1h
        caloriesBurned: calculateActivityCalories(3.5, w, 60),
      },
      {
        id: 'p_workout',
        activityId: 'act_13',
        name: 'Entrenamiento de pesas intenso',
        met: 6.0,
        durationMinutes: 60, // 1h
        caloriesBurned: calculateActivityCalories(6.0, w, 60),
      },
    ]);
  };

  const clearActivities = () => {
    setActivities([]);
  };

  // Cálculos en tiempo real
  const getdResult = useMemo(() => {
    return calculateFullGETD(activities, biometrics);
  }, [activities, biometrics]);

  const intakeTotals = useMemo(() => {
    return calculateIntakeTotals(foodEntries);
  }, [foodEntries]);

  // Gestión de Ingesta
  const addFoodEntry = (
    food: Food,
    grams: number,
    portionLabel?: string,
    targetMeal?: MealType
  ) => {
    const meal = targetMeal || selectedMeal;
    const factor = grams / 100;
    const newEntry: FoodEntry = {
      id: 'fe_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      foodId: food.id,
      foodName: food.name,
      category: food.category,
      meal,
      grams,
      portionUsed: portionLabel || `${grams}g`,
      calories: Math.round(food.caloriesPer100g * factor),
      protein: Number((food.proteinPer100g * factor).toFixed(1)),
      carbs: Number((food.carbsPer100g * factor).toFixed(1)),
      fat: Number((food.fatPer100g * factor).toFixed(1)),
    };
    setFoodEntries((prev) => [newEntry, ...prev]);
  };

  const removeFoodEntry = (entryId: string) => {
    setFoodEntries((prev) => prev.filter((e) => e.id !== entryId));
  };

  const clearFoodEntries = () => {
    setFoodEntries([]);
  };

  // Intercambios inteligentes
  const applyExchange = (oldEntryId: string, suggestion: ExchangeSuggestion) => {
    setFoodEntries((prev) =>
      prev.map((item) => {
        if (item.id === oldEntryId) {
          return {
            ...item,
            foodId: suggestion.food.id,
            foodName: suggestion.food.name,
            category: suggestion.food.category,
            grams: suggestion.grams,
            portionUsed: suggestion.portionLabel,
            calories: suggestion.calories,
            protein: suggestion.protein,
            carbs: suggestion.carbs,
            fat: suggestion.fat,
          };
        }
        return item;
      })
    );
    setActiveEntryToExchange(null);
  };

  // Alimentos Propios
  const addCustomFood = (newFood: Food) => {
    const updated = persistFood(newFood);
    setAvailableFoods(updated);
  };

  const deleteCustomFood = (foodId: string) => {
    const updated = removeStoredFood(foodId);
    setAvailableFoods(updated);
  };

  const resetFoods = () => {
    const defaults = resetFoodsToDefault();
    setAvailableFoods(defaults);
  };

  // Historial de Consultas
  const saveCurrentAsConsultation = (notes?: string): ConsultationRecord | null => {
    if (!activePatient) return null;

    const record: ConsultationRecord = {
      id: 'cons_' + Date.now(),
      patientId: activePatient.id,
      date: new Date().toISOString(),
      biometrics: { ...biometrics },
      tmb: getdResult.tmbReference,
      activityExpenditure: getdResult.activityExpenditure,
      eta: getdResult.eta,
      getd: getdResult.totalGETD,
      activities: [...activities],
      foodEntries: [...foodEntries],
      totalCaloriesIn: intakeTotals.calories,
      totalProteinIn: intakeTotals.protein,
      totalCarbsIn: intakeTotals.carbs,
      totalFatIn: intakeTotals.fat,
      balanceCalories: intakeTotals.calories - getdResult.totalGETD,
      notes,
    };

    saveConsultation(record);
    return record;
  };

  const loadConsultationIntoSession = (record: ConsultationRecord) => {
    setBiometrics(record.biometrics);
    setActivities(record.activities || []);
    setFoodEntries(record.foodEntries || []);
    setCurrentStep(2);
  };

  const resetCurrentSession = () => {
    loadPreset24h();
    setFoodEntries([]);
    setCurrentStep(1);
  };

  return (
    <NutritionContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        biometrics,
        setBiometrics,
        updateBiometricsField,
        activities,
        addActivity,
        removeActivity,
        updateActivityDuration,
        loadPreset24h,
        clearActivities,
        getdResult,
        selectedMeal,
        setSelectedMeal,
        foodEntries,
        addFoodEntry,
        removeFoodEntry,
        clearFoodEntries,
        intakeTotals,
        activeEntryToExchange,
        setActiveEntryToExchange,
        applyExchange,
        availableFoods,
        addCustomFood,
        deleteCustomFood,
        resetFoods,
        saveCurrentAsConsultation,
        loadConsultationIntoSession,
        resetCurrentSession,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition debe utilizarse dentro de un NutritionProvider');
  }
  return context;
}

