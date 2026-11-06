'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRightLeft, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';
import FoodEntryCard from '../intake/FoodEntryCard';
import ExchangeModal from './ExchangeModal';

export default function ExchangeStepView() {
  const {
    foodEntries,
    setCurrentStep,
    activeEntryToExchange,
    setActiveEntryToExchange,
    intakeTotals,
    getdResult,
  } = useNutrition();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Ajuste & Sistema de Intercambios Inteligentes</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Haz clic en <strong>&quot;Intercambiar&quot;</strong> en cualquier alimento para sustituirlo por otro de la misma categoría manteniendo las calorías y macros equivalentes (±5%).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              ← Volver a Ingesta
            </button>
          </div>
        </div>
      </div>

      {/* Lista de alimentos registrados agrupados o en lista */}
      {foodEntries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
          <Utensils className="w-10 h-10 mx-auto mb-3 opacity-40 text-emerald-500" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No hay alimentos registrados en el plato de hoy
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Ve al Paso 2 para registrar los alimentos del paciente y luego podrás intercambiarlos aquí.
          </p>
          <button
            onClick={() => setCurrentStep(2)}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
          >
            Ir a Cargar Ingesta
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Alimentos del día ({foodEntries.length})
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Total: {intakeTotals.calories} kcal de {getdResult.totalGETD} kcal objetivo
            </span>
          </div>

          <div className="space-y-2.5">
            {foodEntries.map((entry) => (
              <FoodEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {/* Modal de intercambio emergente */}
      {activeEntryToExchange && (
        <ExchangeModal onClose={() => setActiveEntryToExchange(null)} />
      )}
    </div>
  );
}

