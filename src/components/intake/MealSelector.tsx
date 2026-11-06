'use client';

import React from 'react';
import { useNutrition } from '../../context/NutritionContext';
import { MealType } from '../../types';
import { Coffee, Sun, Sunset, Cookie } from 'lucide-react';

export default function MealSelector() {
  const { selectedMeal, setSelectedMeal, foodEntries } = useNutrition();

  const meals: { id: MealType; label: string; icon: any; color: string }[] = [
    { id: 'desayuno', label: 'Desayuno', icon: Coffee, color: 'text-amber-500' },
    { id: 'almuerzo', label: 'Almuerzo', icon: Sun, color: 'text-orange-500' },
    { id: 'cena', label: 'Cena', icon: Sunset, color: 'text-indigo-500' },
    { id: 'snack', label: 'Snacks / Peri-entreno', icon: Cookie, color: 'text-emerald-500' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {meals.map((m) => {
        const Icon = m.icon;
        const isSelected = selectedMeal === m.id;
        const count = foodEntries.filter((e) => e.meal === m.id).length;

        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelectedMeal(m.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              isSelected
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : m.color}`} />
            <span>{m.label}</span>
            {count > 0 && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

