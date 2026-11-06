'use client';

import React from 'react';
import { useNutrition } from '../context/NutritionContext';
import StepIndicator from './layout/StepIndicator';
import BiometricForm from './profile/BiometricForm';
import FormulaSelector from './profile/FormulaSelector';
import ActivitySearch from './profile/ActivitySearch';
import ActivityList from './profile/ActivityList';
import GETDSummary from './profile/GETDSummary';
import MealSelector from './intake/MealSelector';
import FoodSearch from './intake/FoodSearch';
import FoodEntryCard from './intake/FoodEntryCard';
import RealTimeBalance from './intake/RealTimeBalance';
import ExchangeStepView from './exchange/ExchangeStepView';
import ExchangeModal from './exchange/ExchangeModal';
import { Utensils, ArrowRight, ArrowLeft } from 'lucide-react';

export default function EvaluationDashboard() {
  const {
    currentStep,
    setCurrentStep,
    foodEntries,
    selectedMeal,
    activeEntryToExchange,
    setActiveEntryToExchange,
    clearFoodEntries,
  } = useNutrition();

  // Filtrar alimentos de la comida activa para vista organizada
  const entriesInActiveMeal = foodEntries.filter((e) => e.meal === selectedMeal);

  return (
    <div className="space-y-6">
      <StepIndicator />

      {/* ==================== PASO 1: PERFIL & GASTO POR METS ==================== */}
      {currentStep === 1 && (
        <div className="space-y-6 max-w-5xl mx-auto px-4">
          <BiometricForm />
          <FormulaSelector />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivitySearch />
            <ActivityList />
          </div>

          <GETDSummary />
        </div>
      )}

      {/* ==================== PASO 2: REGISTRO DINÁMICO DE INGESTA ==================== */}
      {currentStep === 2 && (
        <div className="space-y-6 max-w-5xl mx-auto px-4">
          {/* Gráfico y Balance Energético en Tiempo Real */}
          <RealTimeBalance />

          {/* Selector de Comida (Desayuno, Almuerzo, Cena, Snacks) */}
          <MealSelector />

          {/* Buscador de Alimentos y Porciones Visuales ("En un plato") */}
          <FoodSearch />

          {/* Lista de Alimentos Registrados en la Comida Seleccionada y en el Día */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                  Alimentos en {selectedMeal} ({entriesInActiveMeal.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Total del día acumulado: {foodEntries.length} alimentos
                </p>
              </div>

              {foodEntries.length > 0 && (
                <button
                  type="button"
                  onClick={clearFoodEntries}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-700"
                >
                  Vaciar todo el día
                </button>
              )}
            </div>

            {entriesInActiveMeal.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
                <Utensils className="w-6 h-6 mx-auto mb-2 opacity-40 text-emerald-500" />
                <p>No has añadido alimentos para {selectedMeal}.</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Usa el buscador de arriba para agregar porciones de referencia o medidas en plato.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {entriesInActiveMeal.map((entry) => (
                  <FoodEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>

          {/* Navegación entre Pasos */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Volver al Perfil & GETD</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <span>Ajustar Intercambios (Paso 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== PASO 3: MOTOR DE INTERCAMBIOS ==================== */}
      {currentStep === 3 && (
        <div className="max-w-5xl mx-auto px-4">
          <ExchangeStepView />
        </div>
      )}

      {/* Modal emergente si se activa intercambio desde cualquier punto */}
      {activeEntryToExchange && (
        <ExchangeModal onClose={() => setActiveEntryToExchange(null)} />
      )}
    </div>
  );
}

