'use client';

import React from 'react';
import { FoodEntry, ExchangeSuggestion } from '../../types';
import { Check, ArrowRight, ArrowRightLeft, Sparkles } from 'lucide-react';

interface ComparisonCardProps {
  original: FoodEntry;
  replacement: ExchangeSuggestion;
  onApply: () => void;
}

export default function ComparisonCard({
  original,
  replacement,
  onApply,
}: ComparisonCardProps) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500/50 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {replacement.food.category}
          </span>
          {replacement.isExactMatch && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Equivalente exacto (±5%)
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Δ {replacement.caloriesDiffPercent}% calorías
        </span>
      </div>

      {/* Mini-tarjeta comparativa lado a lado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Alimento Original */}
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
            Alimento Original
          </p>
          <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            {original.portionUsed || `${original.grams}g`} {original.foodName}
          </p>
          <div className="mt-2 space-y-0.5 text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-slate-900 dark:text-white">
              {original.calories} kcal
            </p>
            <p>
              P: {original.protein}g | C: {original.carbs}g | G: {original.fat}g
            </p>
          </div>
        </div>

        {/* Reemplazo Sugerido */}
        <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs relative">
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1">
            <ArrowRightLeft className="w-3 h-3" /> Reemplazo Equivalente
          </p>
          <p className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
            {replacement.portionLabel} {replacement.food.name}
          </p>
          <div className="mt-2 space-y-0.5 text-slate-700 dark:text-slate-300">
            <p className="font-bold text-emerald-700 dark:text-emerald-400">
              {replacement.calories} kcal
            </p>
            <p>
              P: {replacement.protein}g | C: {replacement.carbs}g | G: {replacement.fat}g
            </p>
          </div>
        </div>
      </div>

      {/* Botón Aplicar Reemplazo con 1 clic */}
      <button
        type="button"
        onClick={onApply}
        className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5"
      >
        <Check className="w-4 h-4" />
        <span>Aplicar Reemplazo en el Plato</span>
      </button>
    </div>
  );
}

