'use client';

import React from 'react';
import { FoodEntry, ExchangeSuggestion } from '../../types';
import { Check, ShieldCheck } from 'lucide-react';

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
    <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#1c1c1e] shadow-sm hover:border-[#0A84FF] transition-all apple-card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            {replacement.food.category}
          </span>
          {replacement.isExactMatch && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#30D158]/15 text-[#30D158] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Equivalencia exacta (±5%)
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-zinc-400">
          Δ {replacement.caloriesDiffPercent}% calorías
        </span>
      </div>

      {/* Mini-tarjeta comparativa lado a lado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
        {/* Original */}
        <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 text-xs">
          <p className="text-[10px] text-zinc-400 font-bold uppercase mb-1">
            Alimento Actual
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🍽️</span>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                {original.foodName}
              </p>
              <p className="text-zinc-500 font-medium">
                {original.portionUsed || `${original.grams}g`}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between text-zinc-600 dark:text-zinc-300">
            <span className="font-bold text-zinc-900 dark:text-white">{original.calories} kcal</span>
            <span>P: {original.protein}g • C: {original.carbs}g • G: {original.fat}g</span>
          </div>
        </div>

        {/* Reemplazo */}
        <div className="p-3.5 rounded-xl bg-[#0A84FF]/5 dark:bg-[#0A84FF]/10 border border-[#0A84FF]/30 text-xs relative">
          <p className="text-[10px] text-[#0A84FF] font-bold uppercase mb-1 flex items-center gap-1">
            Opción de Sustitución
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{replacement.food.emoji || '🍽️'}</span>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm">
                {replacement.food.name}
              </p>
              <p className="text-[#0A84FF] font-semibold">
                {replacement.portionLabel} ({replacement.grams}g)
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-[#0A84FF]/20 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
            <span className="font-bold text-zinc-900 dark:text-white">{replacement.calories} kcal</span>
            <span>P: {replacement.protein}g • C: {replacement.carbs}g • G: {replacement.fat}g</span>
          </div>
        </div>
      </div>

      {/* Botón Aplicar con 1 Clic */}
      <button
        type="button"
        onClick={onApply}
        className="w-full py-2.5 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ED] text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 apple-btn"
      >
        <Check className="w-4 h-4" />
        <span>Aplicar Reemplazo en la Dieta</span>
      </button>
    </div>
  );
}
