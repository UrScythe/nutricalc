'use client';

import React from 'react';
import { FoodEntry } from '../../types';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRightLeft, Trash2, Sparkles } from 'lucide-react';

interface FoodEntryCardProps {
  entry: FoodEntry;
}

export default function FoodEntryCard({ entry }: FoodEntryCardProps) {
  const { removeFoodEntry, setActiveEntryToExchange } = useNutrition();

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'proteina':
        return { badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300', emoji: '🍗' };
      case 'carbohidrato':
        return { badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300', emoji: '🍚' };
      case 'grasa':
        return { badge: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300', emoji: '🥑' };
      case 'verdura':
        return { badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300', emoji: '🥦' };
      case 'fruta':
        return { badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300', emoji: '🍎' };
      case 'lacteo':
        return { badge: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300', emoji: '🥛' };
      default:
        return { badge: 'bg-stone-100 text-stone-700', emoji: '🍽️' };
    }
  };

  const theme = getCategoryTheme(entry.category);

  return (
    <div className="p-4 sm:p-5 rounded-3xl border border-stone-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bouncy-hover">
      {/* Alimento y porción */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <span className="text-3xl shrink-0">{theme.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${theme.badge}`}>
              {entry.category}
            </span>
            <span className="text-xs font-bold text-stone-400 capitalize">
              • {entry.meal}
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-black text-stone-900 dark:text-white truncate">
            {entry.foodName}
          </h4>

          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
            🍽️ {entry.portionUsed || `${entry.grams}g`} ({entry.grams}g)
          </p>
        </div>
      </div>

      {/* Macros en tiempo real */}
      <div className="flex items-center gap-2.5 text-xs shrink-0 bg-stone-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-stone-100 dark:border-slate-800">
        <div className="text-center px-2">
          <p className="text-[10px] text-stone-400 uppercase font-bold">Calorías</p>
          <p className="font-black text-stone-900 dark:text-white text-sm">{entry.calories} kcal</p>
        </div>
        <div className="border-l border-stone-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-purple-600 font-bold">P</p>
          <p className="font-extrabold text-stone-700 dark:text-slate-300">{entry.protein}g</p>
        </div>
        <div className="border-l border-stone-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-amber-600 font-bold">C</p>
          <p className="font-extrabold text-stone-700 dark:text-slate-300">{entry.carbs}g</p>
        </div>
        <div className="border-l border-stone-200 dark:border-slate-700 pl-2 text-center">
          <p className="text-[10px] text-pink-600 font-bold">G</p>
          <p className="font-extrabold text-stone-700 dark:text-slate-300">{entry.fat}g</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-2 shrink-0 justify-end">
        <button
          type="button"
          onClick={() => setActiveEntryToExchange(entry)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-black border border-teal-200/80 dark:border-teal-800 transition bouncy-hover"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Intercambiar ✨</span>
        </button>

        <button
          type="button"
          onClick={() => removeFoodEntry(entry.id)}
          title="Eliminar alimento"
          className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition bouncy-hover"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
