'use client';

import React from 'react';
import { FoodEntry } from '../../types';
import { useNutrition } from '../../context/NutritionContext';
import { ArrowRightLeft, Trash2 } from 'lucide-react';

interface FoodEntryCardProps {
  entry: FoodEntry;
}

export default function FoodEntryCard({ entry }: FoodEntryCardProps) {
  const { removeFoodEntry, setActiveEntryToExchange } = useNutrition();

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'proteina':
        return { badge: 'bg-[#5856D6]/15 text-[#5856D6]', emoji: '🍗' };
      case 'carbohidrato':
        return { badge: 'bg-[#FF9500]/15 text-[#FF9500]', emoji: '🍚' };
      case 'grasa':
        return { badge: 'bg-[#FF2D55]/15 text-[#FF2D55]', emoji: '🥑' };
      case 'verdura':
        return { badge: 'bg-[#30D158]/15 text-[#30D158]', emoji: '🥦' };
      case 'fruta':
        return { badge: 'bg-rose-500/15 text-rose-500', emoji: '🍎' };
      case 'lacteo':
        return { badge: 'bg-[#00C7BE]/15 text-[#00C7BE]', emoji: '🥛' };
      default:
        return { badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600', emoji: '🍽️' };
    }
  };

  const theme = getCategoryTheme(entry.category);

  return (
    <div className="p-4 sm:p-4.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#1c1c1e] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 apple-card-hover">
      {/* Alimento y porción */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <span className="text-2xl shrink-0">{theme.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
              {entry.category}
            </span>
            <span className="text-xs text-zinc-400 capitalize">
              • {entry.meal}
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {entry.foodName}
          </h4>

          <p className="text-xs text-[#30D158] font-medium mt-0.5">
            {entry.portionUsed || `${entry.grams}g`} ({entry.grams}g)
          </p>
        </div>
      </div>

      {/* Macros en tiempo real */}
      <div className="flex items-center gap-2.5 text-xs shrink-0 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
        <div className="text-center px-2">
          <p className="text-[10px] text-zinc-400 uppercase font-semibold">Calorías</p>
          <p className="font-bold text-zinc-900 dark:text-white text-sm">{entry.calories} kcal</p>
        </div>
        <div className="border-l border-zinc-200 dark:border-zinc-700 pl-2 text-center">
          <p className="text-[10px] text-[#5856D6] font-bold">P</p>
          <p className="font-bold text-zinc-700 dark:text-zinc-300">{entry.protein}g</p>
        </div>
        <div className="border-l border-zinc-200 dark:border-zinc-700 pl-2 text-center">
          <p className="text-[10px] text-[#FF9500] font-bold">C</p>
          <p className="font-bold text-zinc-700 dark:text-zinc-300">{entry.carbs}g</p>
        </div>
        <div className="border-l border-zinc-200 dark:border-zinc-700 pl-2 text-center">
          <p className="text-[10px] text-[#FF2D55] font-bold">G</p>
          <p className="font-bold text-zinc-700 dark:text-zinc-300">{entry.fat}g</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-2 shrink-0 justify-end">
        <button
          type="button"
          onClick={() => setActiveEntryToExchange(entry)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition apple-btn"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#0A84FF]" />
          <span>Intercambiar</span>
        </button>

        <button
          type="button"
          onClick={() => removeFoodEntry(entry.id)}
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition apple-btn"
          title="Quitar alimento"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
