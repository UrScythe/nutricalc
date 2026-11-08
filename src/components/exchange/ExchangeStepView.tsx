'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
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
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Variedad & Flexibilidad
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
              ¡Intercambios Inteligentes de Alimentos! 🔄
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-medium mt-1">
              Haz clic en <strong>&quot;Intercambiar ✨&quot;</strong> en cualquier comida para ver sustituciones deliciosas que mantienen la misma energía y macronutrientes (±5%).
            </p>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-slate-700 text-xs font-black text-stone-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition flex items-center gap-2 self-start sm:self-auto bouncy-hover"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Plato (Paso 2)</span>
          </button>
        </div>
      </div>

      {foodEntries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-stone-200/80 dark:border-slate-800 p-12 text-center text-stone-400">
          <span className="text-5xl block mb-3">🥗</span>
          <h3 className="text-base font-black text-stone-800 dark:text-slate-200">
            Aún no has servido alimentos en el plato de hoy
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-1 max-w-sm mx-auto">
            Ve al Paso 2 para cargar lo que come tu paciente y podrás probar opciones de intercambio.
          </p>
          <button
            onClick={() => setCurrentStep(2)}
            className="mt-5 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl transition bouncy-hover shadow-md shadow-emerald-600/20"
          >
            Ir a Cargar Alimentos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase tracking-wider text-stone-400">
              Alimentos del día ({foodEntries.length})
            </span>
            <span className="text-xs font-extrabold text-stone-600 dark:text-slate-300">
              Energía actual: {intakeTotals.calories} kcal de {getdResult.totalGETD} kcal meta
            </span>
          </div>

          <div className="space-y-3">
            {foodEntries.map((entry) => (
              <FoodEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      )}

      {activeEntryToExchange && (
        <ExchangeModal onClose={() => setActiveEntryToExchange(null)} />
      )}
    </div>
  );
}
