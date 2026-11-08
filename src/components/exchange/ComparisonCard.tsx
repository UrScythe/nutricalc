'use client';

import React from 'react';
import { FoodEntry, ExchangeSuggestion } from '../../types';
import { Check, Sparkles } from 'lucide-react';

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
    <div className="p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-300 transition-all bouncy-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {replacement.food.category}
          </span>
          {replacement.isExactMatch && (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> ¡Equivalencia exacta (±5%)!
            </span>
          )}
        </div>

        <span className="text-xs font-bold text-stone-400">
          Δ {replacement.caloriesDiffPercent}% calorías
        </span>
      </div>

      {/* Mini-tarjeta comparativa lado a lado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
        {/* Original */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200/60 dark:border-slate-800 text-xs">
          <p className="text-[10px] text-stone-400 font-black uppercase mb-1">
            Alimento Actual en el Plato
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <p className="font-black text-stone-900 dark:text-white text-sm">
                {original.foodName}
              </p>
              <p className="text-stone-500 font-bold">
                {original.portionUsed || `${original.grams}g`}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-stone-200/60 dark:border-slate-700/60 flex items-center justify-between text-stone-600 dark:text-slate-300">
            <span className="font-black text-stone-900 dark:text-white">{original.calories} kcal</span>
            <span>P: {original.protein}g • C: {original.carbs}g • G: {original.fat}g</span>
          </div>
        </div>

        {/* Reemplazo */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300/80 dark:border-emerald-800 text-xs relative">
          <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-black uppercase mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" /> Reemplazo Equivalente
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{replacement.food.emoji || '✨'}</span>
            <div>
              <p className="font-black text-emerald-950 dark:text-emerald-200 text-sm">
                {replacement.food.name}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                {replacement.portionLabel} ({replacement.grams}g)
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-emerald-800 dark:text-emerald-300">
            <span className="font-black text-emerald-900 dark:text-emerald-200">{replacement.calories} kcal</span>
            <span>P: {replacement.protein}g • C: {replacement.carbs}g • G: {replacement.fat}g</span>
          </div>
        </div>
      </div>

      {/* Botón Aplicar con 1 Clic */}
      <button
        type="button"
        onClick={onApply}
        className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 bouncy-hover"
      >
        <Check className="w-4 h-4" />
        <span>¡Me encanta, aplicar cambio en el plato! ✨</span>
      </button>
    </div>
  );
}
