'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { MealType } from '../../types';

export default function MealSelector() {
  const { selectedMeal, setSelectedMeal, foodEntries } = useNutrition();

  const meals: { id: MealType; label: string; emoji: string; color: string }[] = [
    { id: 'desayuno', label: 'Desayuno', emoji: '☕', color: 'from-amber-400 to-orange-400' },
    { id: 'almuerzo', label: 'Almuerzo', emoji: '🥗', color: 'from-emerald-400 to-teal-400' },
    { id: 'cena', label: 'Cena', emoji: '🌙', color: 'from-indigo-400 to-purple-400' },
    { id: 'snack', label: 'Snacks & Merienda', emoji: '🥑', color: 'from-pink-400 to-rose-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {meals.map((m) => {
        const isSelected = selectedMeal === m.id;
        const count = foodEntries.filter((e) => e.meal === m.id).length;

        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedMeal(m.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all bouncy-hover relative flex items-center justify-between ${
              isSelected
                ? 'border-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-emerald-400 shadow-sm'
                : 'border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-stone-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{m.emoji}</span>
              <div>
                <p
                  className={`text-xs sm:text-sm font-black ${
                    isSelected
                      ? 'text-emerald-900 dark:text-emerald-300'
                      : 'text-stone-800 dark:text-slate-200'
                  }`}
                >
                  {m.label}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-slate-400 font-semibold">
                  {count === 0 ? 'Sin alimentos' : `${count} en el plato`}
                </p>
              </div>
            </div>

            {count > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
