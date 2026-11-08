'use client';

import React from 'react';
import { useNutrition } from '../context/NutritionContext';
import AppleHealthHero from './dashboard/AppleHealthHero';
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
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Resumen Ejecutivo Apple Health & Anillos de Actividad */}
      <AppleHealthHero />

      {/* Selector de Etapa Segmentado estilo iOS */}
      <StepIndicator />

      {/* Contenedor con Iluminación Ambiental y Color según el Modo Activo */}
      <div className="relative">
        <div
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-3/4 h-28 blur-3xl opacity-20 pointer-events-none rounded-full transition-colors duration-500 ${
            currentStep === 1
              ? 'bg-[#FF2D55]'
              : currentStep === 2
              ? 'bg-[#30D158]'
              : 'bg-[#0A84FF]'
          }`}
        />

        {/* ==================== ETAPA 1: PERFIL & GASTO POR METS ==================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <BiometricForm />
            <FormulaSelector />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivitySearch />
              <ActivityList />
            </div>

            <GETDSummary />
          </div>
        )}

        {/* ==================== ETAPA 2: REGISTRO DINÁMICO DE INGESTA ==================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* Gráfico y Balance Energético en Tiempo Real */}
            <RealTimeBalance />

            {/* Selector de Comida (Desayuno, Almuerzo, Cena, Snacks) */}
            <MealSelector />

            {/* Buscador de Alimentos y Porciones Visuales ("En un plato") */}
            <FoodSearch />

            {/* Lista de Alimentos Registrados en la Comida Seleccionada y en el Día */}
            <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
                    Alimentos en {selectedMeal} ({entriesInActiveMeal.length})
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Total del día acumulado: {foodEntries.length} alimentos
                  </p>
                </div>

                {foodEntries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFoodEntries}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 apple-btn"
                  >
                    Vaciar todo el día
                  </button>
                )}
              </div>

              {entriesInActiveMeal.length === 0 ? (
                <div className="p-8 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center text-zinc-400 text-xs">
                  <Utensils className="w-6 h-6 mx-auto mb-2 opacity-30 text-[#30D158]" />
                  <p>No has añadido alimentos para {selectedMeal}.</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
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

            {/* Navegación entre Etapas */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1.5 apple-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← Volver a Gasto & METs</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-sm transition flex items-center gap-1.5 apple-btn"
              >
                <span>Ajustar Intercambios (Etapa 3)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== ETAPA 3: MOTOR DE INTERCAMBIOS ==================== */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <ExchangeStepView />
          </div>
        )}
      </div>

      {/* Modal emergente si se activa intercambio desde cualquier punto */}
      {activeEntryToExchange && (
        <ExchangeModal onClose={() => setActiveEntryToExchange(null)} />
      )}
    </div>
  );
}
