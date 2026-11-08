'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowLeft, Repeat, Utensils } from 'lucide-react';
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
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A84FF] flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5" />
              <span>Sistema de Equivalencias Clínicas</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
              Motor de Intercambios Inteligentes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Haz clic en <strong>&quot;Intercambiar&quot;</strong> en cualquier alimento registrado para sustituirlo por opciones del mismo grupo conservando igual energía y macronutrientes (±5%).
            </p>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center gap-2 self-start sm:self-auto apple-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Ingesta (Paso 2)</span>
          </button>
        </div>
      </div>

      {foodEntries.length === 0 ? (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-12 text-center text-zinc-400">
          <Utensils className="w-10 h-10 mx-auto mb-3 opacity-40 text-[#0A84FF]" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
            Aún no has registrado alimentos en la ingesta de hoy
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            Ve a la Etapa 2 para registrar los alimentos que consume tu paciente y podrás probar opciones de intercambio equivalente.
          </p>
          <button
            onClick={() => setCurrentStep(2)}
            className="mt-5 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ED] text-white text-xs font-bold rounded-xl transition apple-btn shadow-sm"
          >
            Registrar Alimentos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Alimentos en la Dieta ({foodEntries.length})
            </span>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              Energía actual: <strong className="text-zinc-900 dark:text-white">{intakeTotals.calories} kcal</strong> de {getdResult.totalGETD} kcal meta
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
